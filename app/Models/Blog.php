<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Blog extends Model
{
    protected $fillable = [
      'nom',
      'email',
      'description',
      'images',    // <— pluriel
    ];

    protected $casts = [
      'images' => 'array',   // JSON ↔ array PHP
    ];
}
