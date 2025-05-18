<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ObsmetMarocDataSeeder extends Seeder
{
    public function run()
    {
        DB::table('obsmet_maroc_data')->insert([
            [
                'permission_id' => 8,
                'station' => 'Station Casablanca',
                'date_observation' => '2025-04-14',
                'temperature' => 23.1,
                'humidite' => 69.8,
                'vent' => 12.3,
                'pression' => 1015.2,
                'notes' => 'Conditions normales observées.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 8,
                'station' => 'Station Fès',
                'date_observation' => '2025-04-15',
                'temperature' => 20.5,
                'humidite' => 64.1,
                'vent' => 19.5,
                'pression' => 1017.9,
                'notes' => 'Conditions normales observées.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 8,
                'station' => 'Station Rabat',
                'date_observation' => '2025-04-16',
                'temperature' => 26.0,
                'humidite' => 49.3,
                'vent' => 9.1,
                'pression' => 1009.6,
                'notes' => 'Conditions normales observées.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 8,
                'station' => 'Station Tanger',
                'date_observation' => '2025-04-17',
                'temperature' => 25.4,
                'humidite' => 60.4,
                'vent' => 13.6,
                'pression' => 1016.4,
                'notes' => 'Conditions normales observées.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 8,
                'station' => 'Station Marrakech',
                'date_observation' => '2025-04-18',
                'temperature' => 22.6,
                'humidite' => 63.7,
                'vent' => 7.2,
                'pression' => 1012.3,
                'notes' => 'Conditions normales observées.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 8,
                'station' => 'Station Oujda',
                'date_observation' => '2025-04-19',
                'temperature' => 25.7,
                'humidite' => 67.3,
                'vent' => 9.0,
                'pression' => 1013.6,
                'notes' => 'Conditions normales observées.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 8,
                'station' => 'Station Agadir',
                'date_observation' => '2025-04-20',
                'temperature' => 22.0,
                'humidite' => 52.8,
                'vent' => 15.9,
                'pression' => 1008.7,
                'notes' => 'Conditions normales observées.',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}