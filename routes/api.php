<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OffreController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HotelsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\ForfaitController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AgenceController;

Route::prefix('v1')->group(function () {
    // Public routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'sendResetLinkEmail']);
    Route::get('/reset-password/{token}', fn() => null)
         ->middleware('guest')
         ->name('password.reset');
    Route::apiResource('agences', AgenceController::class)->only(['index']);

    // Blogs and contact
    Route::apiResource('blogs', BlogController::class)->only(['index','show','store']);
    Route::post('/contact', [ContactController::class, 'store']);
 
    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // Authentication
        Route::post('/logout', [AuthController::class, 'logout']);
        
        // User profile
        Route::get('/profile', [UserController::class, 'getProfile']);
        Route::put('/profile', [UserController::class, 'updateProfile']);
   

        // Forfaits and subscriptions
        Route::get('/forfaits', [ForfaitController::class, 'index']);
        Route::post('/subscribe', [PaymentController::class, 'subscribe']);
        Route::apiResource('agences', AgenceController::class)->only(['index','store']);

// Offres

    Route::get('/my-reservations', [ReservationController::class,'myReservations']);
    Route::put('/reservations/{reservation}', [ReservationController::class,'update']);
    Route::delete('/reservations/{reservation}', [ReservationController::class,'destroy']);

        

        
        // Routes requiring active subscription
        Route::middleware('subscription.active')->group(function() {
                Route::get('/offres', [OffreController::class,'index']);
    Route::post('/offres', [OffreController::class,'store']);
    Route::put('/offres/{offre}', [OffreController::class,'update']);
    Route::delete('/offres/{offre}', [OffreController::class,'destroy']);

        });

        // Existing routes (keep these if they're still needed)
        Route::get('/user/offres', [OffreController::class, 'userOffres']);
        Route::apiResource('reservations', ReservationController::class);
        Route::get('/user/reservations', [ReservationController::class, 'userReservations']);
    });
});