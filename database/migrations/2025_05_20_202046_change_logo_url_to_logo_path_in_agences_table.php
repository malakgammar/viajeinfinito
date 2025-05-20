<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::table('agences', function (Blueprint $table) {
        $table->renameColumn('logo_url', 'logo_path');
    });
}

public function down()
{
    Schema::table('agences', function (Blueprint $table) {
        $table->renameColumn('logo_path', 'logo_url');
    });
}

};
