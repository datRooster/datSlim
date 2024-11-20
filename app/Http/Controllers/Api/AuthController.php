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
            "password" => "required"
        ]);

        /** @var User|null $user */
        $user = User::where("email", $request->input('email'))->first();

        if (!Hash::check((string) $request->input('password'), (string) $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken("myAccessToken")->accessToken;

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