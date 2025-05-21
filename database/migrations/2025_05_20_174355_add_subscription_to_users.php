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
        Schema::table('users', function (Blueprint $table) {
            // Modification du champ role en enum
            $table->enum('role', ['client', 'partner', 'admin'])->default('client')->change();
            
            // Ajout des champs d'abonnement
            $table->foreignId('forfait_id')->nullable()->constrained('forfaits')->onDelete('set null');
            $table->timestamp('subscription_start')->nullable();
            $table->timestamp('subscription_end')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('client')->change();
            $table->dropForeign(['forfait_id']);
            $table->dropColumn(['forfait_id', 'subscription_start', 'subscription_end']);
        });
    }
};