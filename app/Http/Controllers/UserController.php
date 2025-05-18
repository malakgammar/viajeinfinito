<?php
// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Retourne les infos du user authentifié
     */
    public function getProfile(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Met à jour le profil (nom, email, telephone)
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|max:255|unique:users,email,' . $user->id,
            'telephone' => 'required|string|max:20',
        ]);

        $user->update($validated);

        return response()->json($user);
    }
}
