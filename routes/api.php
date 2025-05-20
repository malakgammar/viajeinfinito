<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OffreController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\Hotels;

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ReservationController;

Route::prefix('v1')->group(function () {
    // Public routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
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
        
        // Offres
        Route::apiResource('offres', OffreController::class);
        Route::get('/user/offres', [OffreController::class, 'userOffres']);
        
        // Reservations
        Route::apiResource('reservations', ReservationController::class);
        Route::get('/user/reservations', [ReservationController::class, 'userReservations']);
        
        // Admin blog routes
        Route::apiResource('blogs', BlogController::class)->except(['index','show','store']);
    });
});