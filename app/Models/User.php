<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Passwords\CanResetPassword; // Add this import

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, CanResetPassword; // Reordered traits

    protected $table = 'users';
    
    protected $fillable = [
        'name', 'email', 'password', 'telephone', 'role',
    ];

    protected $hidden = [
        'password', 
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function reservations() {
        return $this->hasMany(Reservation::class, 'id_user');
    }

    public function offres() {
        return $this->hasMany(Offre::class);
    }
}