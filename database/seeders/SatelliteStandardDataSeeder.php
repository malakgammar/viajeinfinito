<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SatelliteStandardDataSeeder extends Seeder
{
    public function run()
    {
        DB::table('satellite_standard_data')->insert([
            [
                'permission_id' => 20,
                'date_capture' => '2025-04-14 12:00:00',
                'satellite_nom' => 'Sentinel-2',
                'resolution_m' => '10',
                'type_image' => 'RGB',
                'image_url' => 'storage/app/public/images/satellite_standard.jpg',
                'commentaire' => 'Données satellite partiellement nuageuses.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 20,
                'date_capture' => '2025-04-15 12:00:00',
                'satellite_nom' => 'Sentinel-2',
                'resolution_m' => '10',
                'type_image' => 'RGB',
                'image_url' => 'storage/app/public/images/satellite_standard.jpg',
                'commentaire' => 'Nuages dispersés.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 20,
                'date_capture' => '2025-04-16 12:00:00',
                'satellite_nom' => 'Landsat-9',
                'resolution_m' => '30',
                'type_image' => 'Multispectral',
                'image_url' => 'storage/app/public/images/satellite_standard.jpg',
                'commentaire' => 'Temps sec observé.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 20,
                'date_capture' => '2025-04-17 12:00:00',
                'satellite_nom' => 'Sentinel-2',
                'resolution_m' => '10',
                'type_image' => 'RGB',
                'image_url' => 'storage/app/public/images/satellite_standard.jpg',
                'commentaire' => 'Couverture dense sur zone ouest.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 20,
                'date_capture' => '2025-04-18 12:00:00',
                'satellite_nom' => 'Landsat-9',
                'resolution_m' => '30',
                'type_image' => 'Multispectral',
                'image_url' => 'storage/app/public/images/satellite_standard.jpg',
                'commentaire' => 'Nuages moyens visibles.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 20,
                'date_capture' => '2025-04-19 12:00:00',
                'satellite_nom' => 'Sentinel-2',
                'resolution_m' => '10',
                'type_image' => 'RGB',
                'image_url' => 'storage/app/public/images/satellite_standard.jpg',
                'commentaire' => 'Zone dégagée.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 20,
                'date_capture' => '2025-04-20 12:00:00',
                'satellite_nom' => 'Landsat-9',
                'resolution_m' => '30',
                'type_image' => 'Multispectral',
                'image_url' => 'storage/app/public/images/satellite_standard.jpg',
                'commentaire' => 'Fortes formations nuageuses.',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}