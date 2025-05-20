<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            // Admin
            [
                'name' => 'Admin Voyage',
                'email' => 'admin@voyage.ma',
                'password' => Hash::make('admin1234'),
                'telephone' => '0600000000',
                'role' => 'admin',
            ],

            // Clients
            [
                'name' => 'Fatima Zahra',
                'email' => 'fatima.zahra@gmail.com',
                'password' => Hash::make('client123'),
                'telephone' => '0612345678',
                'role' => 'client',
            ],
            [
                'name' => 'Mohamed Amine',
                'email' => 'amine.mohamed@gmail.com',
                'password' => Hash::make('client456'),
                'telephone' => '0623456789',
                'role' => 'client',
            ],
            [
                'name' => 'Yasmine El Fassi',
                'email' => 'yasmine.elfassi@gmail.com',
                'password' => Hash::make('client789'),
                'telephone' => '0634567890',
                'role' => 'client',
            ],

            // Partenaires
            [
                'name' => 'Agence Atlas Travel',
                'email' => 'contact@atlastravel.ma',
                'password' => Hash::make('partner123'),
                'telephone' => '0661112233',
                'role' => 'partenaire',
            ],
            [
                'name' => 'Sahara Voyages',
                'email' => 'info@saharavoyages.ma',
                'password' => Hash::make('partner456'),
                'telephone' => '0672223344',
                'role' => 'partenaire',
            ],
        ]);
    }
}
