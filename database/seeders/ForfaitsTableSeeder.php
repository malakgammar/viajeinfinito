<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ForfaitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('forfaits')->insert([
            [
                'slug' => 'basic',
                'name' => 'Basique',
                'price_label' => '999.99MAD/mois',
                'price' => 999.99,
                'duration_days' => 30,
                'ads_limit' => 5,
                'features' => json_encode([
                    'Profil partenaire',
                    '5 annonces/mois',
                    'Support standard'
                ]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'slug' => 'pro',
                'name' => 'Professionnel',
                'price_label' => '1999.99MAD/mois',
                'price' => 1999.99,
                'duration_days' => 30,
                'ads_limit' => -1, // -1 pour illimité
                'features' => json_encode([
                    'Profil partenaire',
                    'Annonces illimitées',
                    'Support prioritaire',
                    'Mise en avant'
                ]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'slug' => 'premium',
                'name' => 'Premium',
                'price_label' => '2999.99MAD/mois',
                'price' => 2999.99,
                'duration_days' => 30,
                'ads_limit' => -1, // -1 pour illimité
                'features' => json_encode([
                    'Profil partenaire',
                    'Annonces illimitées',
                    'Support 24/7',
                    'Mise en avant',
                    'Statistiques avancées'
                ]),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}