<?php

namespace App\Http\Controllers;

use App\Models\Offre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OffreController extends Controller
{
    /**
     * Affiche toutes les offres de l'agence
     */
     public function index()
    {
        $offres = Offre::with(['agence', 'reservations'])
            ->whereHas('agence', function($query) {
                $query->where('user_id', Auth::id());
            })->get();

        return response()->json($offres);
    }

    /**
     * Crée une nouvelle offre
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'agence_id' => [
                'required',
                'exists:agences,id',
                function ($attribute, $value, $fail) {
                    if (!Auth::user()->agences()->where('id', $value)->exists()) {
                        $fail("Cette agence ne vous appartient pas.");
                    }
                }
            ],
            'destination' => 'required|string|max:255',
            'date' => 'required|date',
            'duration' => 'required|integer|min:1',
            'travelers' => 'required|integer|min:1',
            'budget' => 'required|numeric|min:0',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Traitement de l'image
        $path = $request->file('image')->store('offres/images', 'public');
        $data['url_image'] = $path;

        $offre = Offre::create($data);

        return response()->json($offre->load('agence'), 201);
    }

    /**
     * Affiche une offre spécifique
     */
    public function show(Offre $offre)
    {
        $this->authorize('view', $offre);
        return response()->json($offre);
    }

    /**
     * Met à jour une offre
     */
 public function update(Request $request, Offre $offre)
    {
        $this->authorize('update', $offre);

        $data = $request->validate([
            'destination' => 'sometimes|string|max:255',
            'date' => 'sometimes|date',
            'duration' => 'sometimes|integer|min:1',
            'travelers' => 'sometimes|integer|min:1',
            'budget' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:disponible,complet',
            'description' => 'sometimes|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048' // Changé ici aussi
        ]);

        // Traitement du nouveau fichier image
        if ($request->hasFile('image')) {
            // Supprime l'ancienne image si elle existe
            if ($offre->url_image) {
                Storage::disk('public')->delete($offre->url_image);
            }
            
            $path = $request->file('image')->store('offres/images', 'public');
            $data['url_image'] = $path;
        }

        $offre->update($data);

        return response()->json($offre);
    }

    /**
     * Supprime une offre
     */
    public function destroy(Offre $offre)
    {
        $this->authorize('delete', $offre);
        $offre->delete();
        return response()->json(null, 204);
    }
}