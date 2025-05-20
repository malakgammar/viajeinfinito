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

    // Tours
    Route::prefix('tours')->group(function () {
        Route::get('/adventure', [TourController::class, 'adventure'])->name('tours.adventure');
        Route::get('/culture', [TourController::class, 'culture'])->name('tours.culture');
    });

    // Destinations
    Route::prefix('destinations')->group(function () {
        Route::get('/europe', [DestinationController::class, 'europe'])->name('destinations.europe');
        Route::get('/asia', [DestinationController::class, 'asia'])->name('destinations.asia');
        Route::get('/africa', [DestinationController::class, 'africa'])->name('destinations.africa');
    });

    // Hotels
    Route::prefix('hotel')->group(function () {
        Route::get('/5star', [HotelController::class, 'fiveStar'])->name('hotel.5star');
        Route::get('/budget', [HotelController::class, 'budget'])->name('hotel.budget');
    });
    
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