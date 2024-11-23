<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Laravel\Passport\Passport;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
            
        $request->validate([
            "name" => "required|string",
            "email" => "required|string|email|unique:users",
            "password" => "required|confirmed"
        ]);

        /** @var User $user */
        $user = User::create([
            "uuid" => (string) Str::uuid(),
            "name" => $request->input("name"),
            "email" => $request->input("email"),
            "password" => $request->input('password')
        ]);

        return response()->json([
            "status" => "success",
            "message" => "Utente registrato con successo.",
            "data" => [
                "id" => $user->id,
                "uuid" => $user->uuid,
                "name" => $user->name,
                "email" => $user->email,
            ]
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {        
        $request->validate([
            "email" => "required|string|email",
            "password" => "required|string",
            "remember_me" => "boolean",
        ]);
    
        /** @var User|null $user */
        $user = User::where("email", $request->input('email'))->first();

        //$user potrebbe essere null se non viene trovato nessun utente con l’email fornita.
        //Se si tenta di accedere a $user->password senza verificare che $user non sia null 
        //si incorre in warning phpstan, standardizzazione. 
        if (!$user) { return response()->json(['error' => 'Credenziali non valide'], 401);}
        
        //Anche se hai specificato le regole di validazione, 
        //PHPStan potrebbe non essere in grado di dedurre il tipo. Puoi aiutare PHPStan aggiungendo 
        //un’annotazione di tipo o un controllo is_string().

        $password = $request->input('password');
        
        if (!is_string($password)) {
            throw new \UnexpectedValueException('Il campo password deve essere una stringa.');
        }
        
        // Controllo se l'utente esiste
        if (!Hash::check($password, $user->password)) {
            return response()->json(['error' => 'Credenziali non valide'], 401);
        }

        $token = $user->createToken("auth_token")->accessToken;
        $rememberMe = $request->input('remember_me',false);

        if ($rememberMe) {
            $rememberMeToken = Str::random(60);
            $user->update(['remember_token' => $rememberMeToken]);

            return response()->json([
                'status' => "success",
                'message' => 'Login Effettuato con Successo!',
                'token' => $token,
                'token_type' => 'Bearer',
                'expire_at' => Passport::tokensExpireIn(Carbon::now()->addHours(24)),
                "data" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "email" => $user->email
                ],
            ])->cookie(
                'remember_me',
                Crypt::encrypt($rememberMeToken),
                43200, // 30 giorni
                '/',    // Percorso globale
                null,   // Dominio
                false,  // Cambia a true in produzione per HTTPS
                true    // HttpOnly
            );
                
        }

        return response()->json([
            "status" => "success",
            "message" => "Login Effettuato con successo.",
            "token" => $token,
            "data" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email
            ],
        ], 201);
    }

    public function dashboard(): JsonResponse
    {
        /** @var User|null $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                "status" => "error",
                "message" => "Utente non autenticato."
            ], 401);
        }

        return response()->json([
            "status" => 'success',
            "data" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email
            ],
        ], 200);
    }

    public function logout(): JsonResponse
    {
        /** @var User|null $user */
        $user = Auth::user();

        if ($user && $user->token()) {
            /** @var \Laravel\Passport\Token $token */
            $token = $user->token();
            $token->revoke();
        }

        return response()->json([
            "status" => true,
            "message" => "Logout effettuato con successo",
        ]);
    }

    public function authenticateWithRememberMe(Request $request): JsonResponse 
    {
        $rememberMeToken = $request->cookie('remember_me');
        
        if (!$rememberMeToken) {
            return response()->json(['status' => 'error', 'message' => 'No remember me token found'], 401);
        }
        try {
            // Decripta il token dal cookie
            $decryptedToken = Crypt::decrypt($rememberMeToken);
        
            // Debug per verificare il valore decriptato
            if ($decryptedToken === null) {
                return response()->json(['message' => 'Decrypted token is null'], 500);
            }
        
            // Cerca l'utente nel database
            $user = User::where('remember_token', $decryptedToken)->first();
        
            // Debug per verificare se l'utente è stato trovato
            if (!$user) {
                return response()->json(['message' => 'Token valid, but user not found'], 404);
            }
        
            // Genera un nuovo access token
            $newAccessToken = $user->createToken('auth_token')->accessToken;
        
            return response()->json([
                'access_token' => $newAccessToken,
                'user' => $user,
            ]);
        
        } catch (\Exception $e) {
            // Debug nel catch
            return response()->json([
                'message' => 'Error during authentication',
                'exception' => $e->getMessage(), // Messaggio dell'errore
                'remember_me' => $rememberMeToken, // Cookie grezzo
                'decrypted_token' => $decryptedToken ?? 'N/A', // Token decriptato
            ], 500); 
        }
        
    }
    
}