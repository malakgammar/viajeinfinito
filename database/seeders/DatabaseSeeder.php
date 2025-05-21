<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Appelle tes seeders ici
        $this->call([
            ContactSeeder::class,
            BlogSeeder::class,
            OffreSeeder::class,
        UserSeeder::class,
        ReservationSeeder::class,
        ForfaitsTableSeeder::class,
            UserSeeder::class,
        ]);
    }
}
