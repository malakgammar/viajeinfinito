<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Reservation::with(['user', 'offre'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'   => 'required|exists:users,id',
  'offre_id'  => 'required|exists:offres,id',
            'nbPersonne' => 'required|integer|min:1',
            'total' => 'required|numeric',
            'date' => 'required|date',
            'duration' => 'required|integer|min:1'
        ]);
        $table->string('etat')->default('En attente');


        $reservation = Reservation::create($validated);
        return response()->json($reservation, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
{

    $reservation->update(['etat' => $validated['etat']]);
    return response()->json($reservation);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
{
    $reservation->delete();
    return response()->noContent();
}

public function userReservations(Request $request)
{
    $user = $request->user(); // utilisateur connecté
    $reservations = Reservation::with('offre')
        ->where('id_user', $user->id)
        ->get();

    return response()->json($reservations);
}

public function myReservations(Request $request)
{
    $agenceIds = $request->user()->agences()->pluck('id');

    $reservations = Reservation::with(['user','offre'])
        ->whereIn('offre_id', function($q) use($agenceIds){
            $q->select('id')
              ->from('offres')
              ->whereIn('agence_id', $agenceIds);
        })
        ->get();

    return response()->json($reservations);
}



}
