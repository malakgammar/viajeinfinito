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
        'status',
        'description',
        'url_image',
    ];

    // Pour que ton front React puisse lire o.image_url
    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        // Si url_image est vide, retourne null
        return $this->url_image
            ? Storage::disk('public')->url($this->url_image)
            : null;
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
