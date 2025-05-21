<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            // 1) renomme la colonne 'image' en 'images'
            $table->renameColumn('image', 'images');
            // 2) change son type pour JSON (ou TEXT si votre moteur ne supporte pas JSON)
            $table->json('images')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            // on remet comme avant en string
            $table->string('images')->change();
            $table->renameColumn('images', 'image');
        });
    }
};
