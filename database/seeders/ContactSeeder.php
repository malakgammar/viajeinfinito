<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;
use Faker\Factory as Faker;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $i) {
            Contact::create([
                'nom' => $faker->name,
                'email' => $faker->safeEmail,
                'sujet' => $faker->sentence(4),
                'message' => $faker->paragraph(3),
            ]);
        }
    }
}
