<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});




// Formulaire pour saisir l’email (optionnel)
Route::get('/forgot-password', function () {
    // return view('auth.forgot-password');
})->middleware('guest')->name('password.request');

// Formulaire réinitialisation via token
Route::get('/reset-password/{token}', function ($token) {
    // return view('auth.reset-password', ['token' => $token]);
})->middleware('guest')->name('password.reset');
require __DIR__.'/auth.php';
