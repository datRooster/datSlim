<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

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

        $token = $user->createToken("myAccessToken")->accessToken;
        
        $rememberMe = $request->input('remember_me',false);

        if ($rememberMe) {
            $expiration = now()->addWeeks(2);
            $cookie = cookie(
                'remember_token', // Nome del cookie
                $token, // Valore del cookie
                $expiration->diffInMinutes(), // Durata in minuti
                '/', // Path
                'localhost', // Dominio (null per localhost)
                false, // Secure (false per ambiente non HTTPS)
                true, // HttpOnly
                'Lax' // SameSite (usa 'None' se stai testando con domini diversi e HTTPS)
            );
            
            return response()->json([
                "status" => "success",
                "message" => "Login Effettuato con successo.",
                "token" => $token,
                "data" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "email" => $user->email,
                    "cookie_data" => [
                        "name" => $cookie->getName(),
                        "value" => $cookie->getValue(),
                        "domain" => $cookie->getDomain(),
                        "path" => $cookie->getPath(),
                        "secure" => $cookie->isSecure(),
                        "httponly" => $cookie->isHttpOnly(),
                        "samesite" => $cookie->getSameSite()
                    ]
                ],
            ])->cookie($cookie);
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
}