<?php

namespace App\Http\Controllers;

use App\Models\Offre;
use Illuminate\Http\Request;

class OffreController extends Controller
{
    /**
     * Affiche la liste des offres
     */
    public function index()
    {
        $offres = Offre::with(['user', 'reservations'])->get();
        return response()->json($offres);
    }

    /**
     * Crée une nouvelle offre
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'destination' => 'required|string|max:255',
            'date' => 'required|date',
            'duration' => 'required|integer|min:1',
            'travelers' => 'required|integer|min:1',
            'budget' => 'required|numeric|min:0',
            'status' => 'sometimes|string|in:disponible,reservee,terminee',
            'description' => 'required|string',
            'url_image' => 'required|url'
        ]);

        $offre = Offre::create($validated);
        return response()->json($offre, 201);
    }

    /**
     * Affiche une offre spécifique
     */
    public function show(Offre $offre)
    {
        return response()->json($offre->load(['user', 'reservations']));
    }

    /**
     * Met à jour une offre
     */
    public function update(Request $request, Offre $offre)
    {
        $validated = $request->validate([
            'destination' => 'sometimes|string|max:255',
            'date' => 'sometimes|date',
            'duration' => 'sometimes|integer|min:1',
            'travelers' => 'sometimes|integer|min:1',
            'budget' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:disponible,reservee,terminee',
            'description' => 'sometimes|string',
            'url_image' => 'sometimes|url'
        ]);

        $offre->update($validated);
        return response()->json($offre);
    }

    /**
     * Supprime une offre
     */
    public function destroy(Offre $offre)
    {
        $offre->delete();
        return response()->json(null, 204);
    }

    /**
     * Récupère les offres d'un utilisateur spécifique
     */
    public function userOffres($userId)
    {
        $offres = Offre::where('user_id', $userId)
                      ->with(['reservations'])
                      ->get();
        
        return response()->json($offres);
    }
}