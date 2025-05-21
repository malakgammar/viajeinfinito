<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Forfait extends Model
{
    protected $fillable = [
        'slug',
        'name', 
        'price_label',
        'price',
        'duration_days',
        'ads_limit',
        'features'
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
    public function setFeaturesAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['features'] = json_encode($value);
        } elseif (is_string($value)) {
            // If it's a JSON string, keep it as is
            json_decode($value);
            $this->attributes['features'] = (json_last_error() === JSON_ERROR_NONE) 
                ? $value 
                : json_encode([$value]);
        } else {
            $this->attributes['features'] = json_encode([]);
        }
    }
}