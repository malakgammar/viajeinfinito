<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['nom', 'email', 'description', 'image'];

    protected $casts = [
    'image' => 'array',
];
} 