<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reservation;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Reservation::insert([
            [
                'id_user' => 1,
                'id_offre' => 1,
                'nbPersonne' => 2,
                'total' => 3500,
                'date' => '2025-07-10',
                'duration' => 5,
                'etat' => 'confirmée',
            ],
            [
                'id_user' => 2,
                'id_offre' => 2,
                'nbPersonne' => 4,
                'total' => 7000,
                'date' => '2025-08-15',
                'duration' => 7,
                'etat' => 'en attente',
            ],
            [
                'id_user' => 3,
                'id_offre' => 3,
                'nbPersonne' => 1,
                'total' => 1200,
                'date' => '2025-06-01',
                'duration' => 3,
                'etat' => 'annulée',
            ],
            [
                'id_user' => 1,
                'id_offre' => 4,
                'nbPersonne' => 3,
                'total' => 5400,
                'date' => '2025-09-05',
                'duration' => 6,
                'etat' => 'confirmée',
            ],
            [
                'id_user' => 4,
                'id_offre' => 2,
                'nbPersonne' => 2,
                'total' => 3000,
                'date' => '2025-10-12',
                'duration' => 4,
                'etat' => 'en attente',
            ],
        ]);
    }
}
