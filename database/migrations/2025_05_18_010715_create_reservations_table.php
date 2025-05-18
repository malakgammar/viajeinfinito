<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('id_user')->constrained('users');
    $table->foreignId('id_offre')->constrained('offres');
    $table->integer('nbPersonne');
    $table->decimal('total', 10, 2);
    $table->date('date');
    $table->integer('duration');
    $table->string('etat')->default('en_attente');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
