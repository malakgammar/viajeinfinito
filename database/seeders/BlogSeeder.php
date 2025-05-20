<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;

class BlogSeeder extends Seeder
{
    public function run()
    {
        Blog::create([
            'nom' => 'Voyage Aventure',
            'email' => 'contact@voyageaventure.com',
            'description' => 'Découvrez les plus belles destinations d’aventure à travers le monde.',
            'image' => ['blog1.jpg', 'blog1_2.jpg']
        ]);

        Blog::create([
            'nom' => 'Globe-Trotter Tips',
            'email' => 'hello@globetrotter.com',
            'description' => 'Astuces et conseils pour un voyage réussi sans se ruiner.',
            'image' => ['globe1.jpg']
        ]);

        Blog::create([
            'nom' => 'Évasion Nature',
            'email' => 'info@evasionnature.fr',
            'description' => 'Un blog dédié aux amoureux de la nature et des grands espaces.',
            'image' => ['nature1.jpg', 'nature2.jpg']
        ]);
    }
}
