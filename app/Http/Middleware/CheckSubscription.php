<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckSubscription
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Vérifie si l'utilisateur a un abonnement actif
        if (!$user || !$user->subscription_end || $user->subscription_end->isPast()) {
            return response()->json([
                'message' => 'Abonnement requis ou abonnement expiré'
            ], 403);
        }

        return $next($request);
    }
}