<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Offre extends Model
{
    protected $fillable = [
        'agence_id',
        'destination',
        'date',
        'duration',
        'travelers',
        'budget',
        'description',
        'url_image'
    ];

    protected $appends = ['image_url'];

    protected $casts = [
        'date' => 'date',
        'budget' => 'decimal:2'
    ];

    public function getImageUrlAttribute()
    {
        return $this->url_image ? Storage::url($this->url_image) : null;
    }

    public function agence()
    {
        return $this->belongsTo(Agence::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}