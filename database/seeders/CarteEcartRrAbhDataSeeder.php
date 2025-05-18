<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarteEcartRrAbhDataSeeder extends Seeder
{
    public function run()
    {
        DB::table('carte_ecart_rr_abh_data')->insert([
            [
                'permission_id' => 2,
                'date_observation' => '2025-04-14',
                'zone' => 'Tanger',
                'ecart_precipitation' => -4.0,
                'valeur_absolue_mm' => 29.7,
                'moyenne_climatique_mm' => 31.3,
                'image_url' => 'storage/app/public/images/carte_ecart_rr_abh.jpeg',
                'commentaire' => 'Commentaire journalier sur RR.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 2,
                'date_observation' => '2025-04-15',
                'zone' => 'Rif',
                'ecart_precipitation' => 2.4,
                'valeur_absolue_mm' => 48.8,
                'moyenne_climatique_mm' => 32.6,
                'image_url' => 'storage/app/public/images/carte_ecart_rr_abh.jpeg',
                'commentaire' => 'Commentaire journalier sur RR.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 2,
                'date_observation' => '2025-04-16',
                'zone' => 'Rif',
                'ecart_precipitation' => 2.0,
                'valeur_absolue_mm' => 43.1,
                'moyenne_climatique_mm' => 31.6,
                'image_url' => 'storage/app/public/images/carte_ecart_rr_abh.jpeg',
                'commentaire' => 'Commentaire journalier sur RR.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 2,
                'date_observation' => '2025-04-17',
                'zone' => 'Tanger',
                'ecart_precipitation' => -0.3,
                'valeur_absolue_mm' => 28.8,
                'moyenne_climatique_mm' => 47.1,
                'image_url' => 'storage/app/public/images/carte_ecart_rr_abh.jpeg',
                'commentaire' => 'Commentaire journalier sur RR.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 2,
                'date_observation' => '2025-04-18',
                'zone' => 'Souss-Massa',
                'ecart_precipitation' => -11.8,
                'valeur_absolue_mm' => 23.2,
                'moyenne_climatique_mm' => 49.6,
                'image_url' => 'storage/app/public/images/carte_ecart_rr_abh.jpeg',
                'commentaire' => 'Commentaire journalier sur RR.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 2,
                'date_observation' => '2025-04-19',
                'zone' => 'Atlas',
                'ecart_precipitation' => 3.9,
                'valeur_absolue_mm' => 20.4,
                'moyenne_climatique_mm' => 58.1,
                'image_url' => 'storage/app/public/images/carte_ecart_rr_abh.jpeg',
                'commentaire' => 'Commentaire journalier sur RR.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'permission_id' => 2,
                'date_observation' => '2025-04-20',
                'zone' => 'Nord Maroc',
                'ecart_precipitation' => -12.8,
                'valeur_absolue_mm' => 43.0,
                'moyenne_climatique_mm' => 21.1,
                'image_url' => 'storage/app/public/images/carte_ecart_rr_abh.jpeg',
                'commentaire' => 'Commentaire journalier sur RR.',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}