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
        Schema::table('lokacije', function (Blueprint $table) {
            $table->string('naziv',100)->change(); 
            $table->string('adresa',100)->change(); 
            $table->string('grad',100)->change(); 
            $table->string('drzava',100)->change(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lokacije', function (Blueprint $table) {
            $table->string('naziv',10)->change(); 
            $table->string('adresa',10)->change(); 
            $table->string('grad',10)->change(); 
            $table->string('drzava',10)->change(); 
        });
    }
};
