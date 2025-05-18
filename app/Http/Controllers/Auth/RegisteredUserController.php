<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|string|email|max:255|unique:users',
            'telephone'             => 'nullable|string|max:20',
            'password'              => 'required|string|confirmed|min:6',
            'password_confirmation' => 'required|string',
            'role'                  => 'nullable|string|in:client,partner,admin',
        ]);

        $user = User::create([
            'name'      => $data['name'],
            'email'     => $data['email'],
            'telephone' => $data['telephone'] ,
            'password'  => Hash::make($data['password']),
            'role'      => $data['role'] ?? 'client',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ], 201);
    }
}
