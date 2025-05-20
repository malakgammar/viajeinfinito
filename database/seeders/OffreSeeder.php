<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Offre;
use App\Models\User;
use Faker\Factory as Faker;

class OffreSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // S'assurer qu'on a au moins quelques utilisateurs
        $userIds = User::pluck('id');

        if ($userIds->count() === 0) {
            // Si aucun utilisateur, on crée quelques uns
            $userIds = collect(
                User::factory()->count(3)->create()
            )->pluck('id');
        }

        foreach (range(1, 10) as $i) {
            Offre::create([
                'user_id'     => $faker->randomElement($userIds),
                'destination' => $faker->city,
                'date'        => $faker->dateTimeBetween('+1 week', '+6 months')->format('Y-m-d'),
                'duration'    => $faker->numberBetween(3, 14), // jours
                'travelers'   => $faker->numberBetween(1, 6),
                'budget'      => $faker->numberBetween(500, 5000),
                'status'      => $faker->randomElement(['en attente', 'confirmé', 'annulé']),
                'description' => $faker->paragraph(3),
                'url_image'   => $faker->imageUrl(800, 600, 'travel', true, 'offre'),
            ]);
        }
    }
}
