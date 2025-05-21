<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Partenaire',
                'email' => 'partenaire@example.com',
                'password' => Hash::make('password'),
                'role' => 'partner',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Client',
                'email' => 'client@example.com',
                'password' => Hash::make('password'),
                'role' => 'client',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}