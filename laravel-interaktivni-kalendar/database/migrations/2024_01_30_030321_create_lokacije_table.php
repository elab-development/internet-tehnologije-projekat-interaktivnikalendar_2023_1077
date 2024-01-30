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
        Schema::create('lokacije', function (Blueprint $table) {
            $table->id();
            $table->string('naziv',10); 
            $table->string('adresa',10); 
            $table->string('grad',10); 
            $table->string('drzava',10); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lokacije');
    }
};
