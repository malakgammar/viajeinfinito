<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Le chemin vers la route "home" de l'application.
     */
    public const HOME = '/home';

    /**
     * Définir les liaisons de route, les filtres de modèle, etc.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();

        // Chargement des routes API avec un préfixe "api/v1"
        Route::prefix('api/v1')
            ->middleware('api')
            ->group(base_path('routes/api.php'));

        // Chargement des routes web
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }

    /**
     * Configuration du rate limiting pour les routes API.
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)
                        ->by($request->user()?->id ?: $request->ip());
        });
    }
}
