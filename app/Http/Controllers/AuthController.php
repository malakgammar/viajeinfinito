<?php
// app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle login (pas de session, juste Sanctum token)
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (! Auth::once($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user  = Auth::user();
        $token = $user->createToken(
            'api-token',
            ['*'],
            now()->addDays(30)
        )->plainTextToken;

        return response()->json([
            'token'      => $token,
            'expires_at' => now()->addDays(30)->toDateTimeString(),
        ]);
    }

    /**
     * Handle logout (supprime le token courant)
     */
    public function logout(Request $request)
    {
        $request->user()
                ->currentAccessToken()
                ->delete();

        return response()->json(['message' => 'Déconnecté']);
    }
}
