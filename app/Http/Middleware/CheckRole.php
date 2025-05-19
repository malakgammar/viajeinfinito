<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $req, Closure $next, ...$roles)
    {
        $user = $req->user();
        if (!$user || ! in_array($user->role, $roles)) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }
        return $next($req);
    }
}
