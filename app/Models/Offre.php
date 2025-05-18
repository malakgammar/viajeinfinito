<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    protected $fillable = [
        'user_id', 'destination', 'date', 'duration', 
        'travelers', 'budget', 'status', 'description', 'url_image'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function reservations() {
        return $this->hasMany(Reservation::class, 'id_offre');
    }
}