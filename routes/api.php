<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OffreController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ReservationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Authentification
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Routes publiques
Route::apiResource('blogs', BlogController::class)
     ->only(['index','show','store']); 
Route::post('contact', [ContactController::class, 'store']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    // Profil utilisateur
Route::get('/user/profile', [UserController::class, 'getProfile']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::get('/offres/user/{userId}', [OffreController::class, 'userOffres']);
    
    // Offres
    Route::apiResource('offres', OffreController::class);
    Route::get('user/offres', [OffreController::class, 'userOffres']);
    
    // Réservations
    Route::apiResource('reservations', ReservationController::class);
    Route::get('user/reservations', [ReservationController::class, 'userReservations']);
    
    // Blog (création/modification admin)
    Route::apiResource('blogs', BlogController::class)
         ->except(['index','show','store']);
});

// Route de test
Route::middleware('auth:sanctum')->get('/test-auth', function () {
    return response()->json(['message' => 'Authentifié avec succès']);
});