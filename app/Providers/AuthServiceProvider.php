<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any authentication / authorization services.
     */
    public function register(): void
    {
        // Ici vous pouvez enregistrer vos policies si nécessaire
        $this->registerPolicies();
    }

    /**
     * Bootstrap any authentication / authorization services.
     */
    public function boot(): void
    {
        // Enregistre les policies
        $this->registerPolicies();

        // Surcharge de l'URL de réinitialisation pour qu'elle pointe vers le front React
        ResetPassword::createUrlUsing(function ($user, string $token) {
            $email = urlencode($user->getEmailForPasswordReset());
            return config('app.frontend_url')
                 ."/auth/reset-password/{$token}"
                 ."?email={$email}";
        });
    }
}
