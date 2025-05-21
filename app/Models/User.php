<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Passwords\CanResetPassword;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, CanResetPassword;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'telephone',
        'role',
        'forfait_id',
        'subscription_start',
        'subscription_end',
        'email_verified_at',
        'remember_token'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'subscription_start' => 'datetime',
        'subscription_end' => 'datetime',
    ];

    /**
     * Get the user's reservations
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'id_user');
    }

    /**
     * Get the user's offers
     */
    public function offres()
    {
        return $this->hasMany(Offre::class);
    }

    /**
     * Get the user's subscription plan
     */
    public function forfait()
    {
        return $this->belongsTo(Forfait::class);
    }

    /**
     * Get the agencies owned by the user (for partners)
     */
    public function agences()
    {
        return $this->hasMany(Agence::class);
    }

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is partner
     */
    public function isPartner(): bool
    {
        return $this->role === 'partner';
    }

    /**
     * Check if user has active subscription
     */
    public function hasActiveSubscription(): bool
    {
        return $this->subscription_end && $this->subscription_end->isFuture();
    }
}