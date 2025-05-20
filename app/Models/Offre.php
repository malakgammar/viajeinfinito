<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    protected $fillable = [
        'user_id', 
        'destination', 
        'date', 
        'duration', 
        'travelers', 
        'budget', 
        'status', 
        'description', 
        'url_image',
        'category_type',  // 'tours', 'destinations', 'hotel'
        'category_value' // par exemple 'adventure', 'europe', '5star' etc.
    ];

    // Constantes pour les catégories
    const CATEGORY_TOURS = 'tours';
    const CATEGORY_DESTINATIONS = 'destinations';
    const CATEGORY_HOTEL = 'hotel';

    // Sous-catégories pour Tours
    const TOUR_ADVENTURE = 'adventure';
    const TOUR_CULTURE = 'culture';

    // Sous-catégories pour Destinations
    const DESTINATION_EUROPE = 'europe';
    const DESTINATION_ASIA = 'asia';
    const DESTINATION_AFRICA = 'africa';

    // Sous-catégories pour Hotel
    const HOTEL_5STAR = '5star';
    const HOTEL_BUDGET = 'budget';

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function reservations() {
        return $this->hasMany(Reservation::class, 'id_offre');
    }

    // Scopes pour filtrer
    public function scopeFilterByCategory($query, $type, $value = null)
    {
        $query->where('category_type', $type);
        
        if ($value) {
            $query->where('category_value', $value);
        }
        
        return $query;
    }

    public function scopeAdventureTours($query)
    {
        return $this->scopeFilterByCategory($query, self::CATEGORY_TOURS, self::TOUR_ADVENTURE);
    }

    public function scopeCultureTours($query)
    {
        return $this->scopeFilterByCategory($query, self::CATEGORY_TOURS, self::TOUR_CULTURE);
    }

    public function scopeEuropeDestinations($query)
    {
        return $this->scopeFilterByCategory($query, self::CATEGORY_DESTINATIONS, self::DESTINATION_EUROPE);
    }

}