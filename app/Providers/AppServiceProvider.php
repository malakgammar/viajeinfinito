<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Enregistrement des services de l’application.
     */
    public function register(): void
    {
        // Vous pouvez enregistrer ici des bindings si besoin
    }

    /**
     * Bootstrap des services de l’application.
     */
    public function boot(): void
    {
        // Code à exécuter au démarrage de l’application
    }
}
