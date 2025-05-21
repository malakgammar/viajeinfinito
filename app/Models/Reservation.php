<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
   protected $fillable = [
  'user_id', 'offre_id',
  'nbPersonne', 'total', 'date', 'duration', 'etat'
];


    public function user() {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function offre() {
        return $this->belongsTo(Offre::class, 'id_offre');
    }
}