<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Afficher tous les avis.
     */
    public function index()
    {
        return response()->json(Blog::all());
    }

    /**
     * Enregistrer un nouvel avis avec upload d’images.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom'         => 'required|string|max:255',
            'email'       => 'required|email',
            'description' => 'required|string',
            'images'      => 'nullable|array',
            'images.*'    => 'image|max:2048', // max 2 Mo par image
        ]);

        $imagePaths = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $imagePaths[] = Storage::url($path); // ex: /storage/reviews/xyz.jpg
            }
        }

        $blog = Blog::create([
            'nom'         => $validated['nom'],
            'email'       => $validated['email'],
            'description' => $validated['description'],
            'image'       => json_encode($imagePaths), // stocké en JSON dans la BDD
        ]);

        return response()->json($blog, 201);
    }

    public function show(string $id)
    {
        $blog = Blog::findOrFail($id);
        return response()->json($blog);
    }

    public function update(Request $request, string $id)
    {
        // Optionnel : logique de mise à jour si tu ajoutes un panneau admin
    }

    public function destroy(string $id)
    {
        // Optionnel : suppression d’un avis
    }
}
