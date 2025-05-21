<?php

namespace App\Http\Controllers;

use App\Models\Agence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AgenceController extends Controller
{
    public function index()
    {
        return Agence::all();
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // Changé de logo_url à logo
        ]);

        // Traitement du fichier uploadé
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('agences/logos', 'public');
            $data['logo_path'] = $path; // Utilisez logo_path au lieu de logo_url
        }

        $agence = Auth::user()->agences()->create($data);

        return response()->json([
            'success' => true,
            'agence' => $agence->load('user')
        ], 201);
    }
}