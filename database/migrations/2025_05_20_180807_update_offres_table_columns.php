<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('offres', function (Blueprint $table) {
            // 1. Supprimer l'ancienne clé étrangère
            $table->dropForeign(['user_id']);
            
            // 2. Renommer user_id en agence_id
            $table->renameColumn('user_id', 'agence_id');
            
            // 3. Ajouter la nouvelle clé étrangère
            $table->foreign('agence_id')
                  ->references('id')
                  ->on('agences')
                  ->onDelete('cascade');
            
            // 4. Modifier les colonnes existantes si nécessaire
            $table->string('destination')->change();
            $table->date('date')->change();
            $table->integer('duration')->change();
            $table->integer('travelers')->change();
            $table->decimal('budget', 10, 2)->change();
            $table->string('status')->default('disponible')->change();
            $table->text('description')->change();
            $table->string('url_image')->change();
        });
    }

    public function down()
    {
        Schema::table('offres', function (Blueprint $table) {
            // Annuler les changements en cas de rollback
            $table->dropForeign(['agence_id']);
            $table->renameColumn('agence_id', 'user_id');
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }
};