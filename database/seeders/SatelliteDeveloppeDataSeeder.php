<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SatelliteDeveloppeDataSeeder extends Seeder
{
    public function run()
    {
        DB::table('satellite_developpe_data')->insert([
            [
                'permission_id' => 21,
                'date_capture' => '2025-04-14 12:00:00',
                'mission' => 'Analyse agricole',
                'bande_spectrale' => 'NDVI',
                'couverture_geographique' => 'Oriental',
                'image_url' => 'storage/app/public/images/satellite_developpe.jpg',
                'analyse' => 'Données précises enregistrées.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 21,
                'date_capture' => '2025-04-15 12:00:00',
                'mission' => 'Analyse agricole',
                'bande_spectrale' => 'NDVI',
                'couverture_geographique' => 'Tadla',
                'image_url' => 'storage/app/public/images/satellite_developpe.jpg',
                'analyse' => 'Humidité du sol en hausse.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 21,
                'date_capture' => '2025-04-16 12:00:00',
                'mission' => 'Analyse forestière',
                'bande_spectrale' => 'NIR',
                'couverture_geographique' => 'Moyen Atlas',
                'image_url' => 'storage/app/public/images/satellite_developpe.jpg',
                'analyse' => 'Ciel dégagé, rayonnement élevé.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 21,
                'date_capture' => '2025-04-17 12:00:00',
                'mission' => 'Surveillance désertique',
                'bande_spectrale' => 'SWIR',
                'couverture_geographique' => 'Sud-Est',
                'image_url' => 'storage/app/public/images/satellite_developpe.jpg',
                'analyse' => 'Zone sèche surveillée.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 21,
                'date_capture' => '2025-04-18 12:00:00',
                'mission' => 'Analyse agricole',
                'bande_spectrale' => 'NDVI',
                'couverture_geographique' => 'Haouz',
                'image_url' => 'storage/app/public/images/satellite_developpe.jpg',
                'analyse' => 'Sol modérément humide.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 21,
                'date_capture' => '2025-04-19 12:00:00',
                'mission' => 'Analyse thermique',
                'bande_spectrale' => 'TIR',
                'couverture_geographique' => 'Guelmim',
                'image_url' => 'storage/app/public/images/satellite_developpe.jpg',
                'analyse' => 'Rayonnement maximal atteint.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 21,
                'date_capture' => '2025-04-20 12:00:00',
                'mission' => 'Surveillance désertique',
                'bande_spectrale' => 'SWIR',
                'couverture_geographique' => 'Zagora',
                'image_url' => 'storage/app/public/images/satellite_developpe.jpg',
                'analyse' => 'Conditions désertiques observées.',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}