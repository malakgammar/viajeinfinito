<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlancheQuotidienneDataSeeder extends Seeder
{
    public function run()
    {
        DB::table('planche_quotidienne_data')->insert([
            [
                'permission_id' => 9,
                'date_observation' => '2025-04-14',
                'ville' => 'Marrakech',
                'temperature_max' => 30.3,
                'temperature_min' => 17.0,
                'precipitation' => 0.0,
                'resume_journee' => 'Journée ensoleillée.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 9,
                'date_observation' => '2025-04-15',
                'ville' => 'Casablanca',
                'temperature_max' => 24.2,
                'temperature_min' => 15.4,
                'precipitation' => 2.1,
                'resume_journee' => 'Pluie modérée prévue.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 9,
                'date_observation' => '2025-04-16',
                'ville' => 'Fès',
                'temperature_max' => 25.7,
                'temperature_min' => 13.8,
                'precipitation' => 0.0,
                'resume_journee' => 'Temps partiellement couvert.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 9,
                'date_observation' => '2025-04-17',
                'ville' => 'Tanger',
                'temperature_max' => 22.1,
                'temperature_min' => 14.9,
                'precipitation' => 1.3,
                'resume_journee' => 'Possibilité d\'averses.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 9,
                'date_observation' => '2025-04-18',
                'ville' => 'Agadir',
                'temperature_max' => 27.5,
                'temperature_min' => 16.2,
                'precipitation' => 0.0,
                'resume_journee' => 'Ciel dégagé.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 9,
                'date_observation' => '2025-04-19',
                'ville' => 'Oujda',
                'temperature_max' => 23.4,
                'temperature_min' => 13.0,
                'precipitation' => 0.0,
                'resume_journee' => 'Temps sec.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 9,
                'date_observation' => '2025-04-20',
                'ville' => 'Rabat',
                'temperature_max' => 24.0,
                'temperature_min' => 14.5,
                'precipitation' => 1.9,
                'resume_journee' => 'Risque d\'averses l\'après-midi.',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}