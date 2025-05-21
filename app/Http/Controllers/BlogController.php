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
        // 1. Validation des champs
        $validated = $request->validate([
            'nom'         => 'required|string|max:255',
            'email'       => 'required|email',
            'description' => 'required|string',
            'images'      => 'nullable|array',
            'images.*'    => 'image|max:2048', // max 2 Mo par image
        ]);

        // 2. Traitement des fichiers
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // stocke dans storage/app/public/reviews et renvoie le chemin /storage/reviews/xxx.jpg
                $path = $image->store('reviews', 'public');
                $imagePaths[] = Storage::url($path);
            }
        }

        // 3. Création du modèle
        $blog = Blog::create([
            'nom'         => $validated['nom'],
            'email'       => $validated['email'],
            'description' => $validated['description'],
            // si votre colonne s’appelle toujours `image` vous pouvez encoder en JSON :
            // 'image'     => json_encode($imagePaths),
            // sinon, si vous avez renommé en `images` et casté en array :
            'images'      => $imagePaths,
        ]);

        return response()->json($blog, 201);
    }

    /**
     * Afficher un avis.
     */
    public function show(string $id)
    {
        $blog = Blog::findOrFail($id);
        return response()->json($blog);
    }

    // update() et destroy() à compléter selon vos besoins
}
