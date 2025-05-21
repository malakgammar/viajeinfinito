<?php

namespace App\Http\Controllers;

use App\Models\Forfait;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PaymentController extends Controller
{
    /**
     * Traite un nouvel abonnement
     */
    public function subscribe(Request $request)
    {
        $data = $request->validate([
            'forfait_id' => 'required|exists:forfaits,id'
        ]);

        $user = $request->user();
        $forfait = Forfait::findOrFail($data['forfait_id']);

        // Mise à jour de l'utilisateur
        $user->update([
            'role' => 'partner',
            'forfait_id' => $forfait->id,
            'subscription_start' => Carbon::now(),
            'subscription_end' => Carbon::now()->addDays($forfait->duration_days),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Abonnement activé avec succès',
            'subscription_end' => $user->subscription_end->format('Y-m-d H:i:s'),
            'forfait' => $forfait->name
        ]);
    }
}