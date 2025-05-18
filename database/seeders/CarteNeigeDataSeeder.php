<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarteNeigeDataSeeder extends Seeder
{
    public function run()
    {
        DB::table('carte_neige_data')->insert([
            [
                'permission_id' => 1,
                'date_observation' => '2025-04-14',
                'region' => 'Centre Maroc',
                'hauteur_neige_cm' => 12.3,
                'temperature' => 1.0,
                'vent_kmh' => 9.3,
                'image_url' => 'storage/app/public/images/carte_neige_data.jpg',
                'description' => 'Observation neigeuse du jour.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 1,
                'date_observation' => '2025-04-15',
                'region' => 'Fès',
                'hauteur_neige_cm' => 43.2,
                'temperature' => 0.5,
                'vent_kmh' => 13.9,
                'image_url' => 'storage/app/public/images/carte_neige_data.jpg',
                'description' => 'Observation neigeuse du jour.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 1,
                'date_observation' => '2025-04-16',
                'region' => 'Souss-Massa',
                'hauteur_neige_cm' => 11.2,
                'temperature' => 2.5,
                'vent_kmh' => 15.6,
                'image_url' => 'storage/app/public/images/carte_neige_data.jpg',
                'description' => 'Observation neigeuse du jour.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 1,
                'date_observation' => '2025-04-17',
                'region' => 'Atlas',
                'hauteur_neige_cm' => 16.3,
                'temperature' => 1.3,
                'vent_kmh' => 14.0,
                'image_url' => 'storage/app/public/images/carte_neige_data.jpg',
                'description' => 'Observation neigeuse du jour.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 1,
                'date_observation' => '2025-04-18',
                'region' => 'Gharb',
                'hauteur_neige_cm' => 39.9,
                'temperature' => -1.8,
                'vent_kmh' => 7.1,
                'image_url' => 'storage/app/public/images/carte_neige_data.jpg',
                'description' => 'Observation neigeuse du jour.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 1,
                'date_observation' => '2025-04-19',
                'region' => 'Fès',
                'hauteur_neige_cm' => 35.8,
                'temperature' => -2.0,
                'vent_kmh' => 10.2,
                'image_url' => 'storage/app/public/images/carte_neige_data.jpg',
                'description' => 'Observation neigeuse du jour.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 1,
                'date_observation' => '2025-04-20',
                'region' => 'Marrakech',
                'hauteur_neige_cm' => 31.5,
                'temperature' => -0.7,
                'vent_kmh' => 14.0,
                'image_url' => 'storage/app/public/images/carte_neige_data.jpg',
                'description' => 'Observation neigeuse du jour.',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}