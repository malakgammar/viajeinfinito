<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('offres', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('destination');
            $table->date('date');
            $table->integer('duration');
            $table->integer('travelers');
            $table->decimal('budget', 10, 2);
            $table->string('status')->default('disponible');
            $table->text('description');
            $table->string('url_image');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('offres');
    }
};