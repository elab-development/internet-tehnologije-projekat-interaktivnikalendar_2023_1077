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
        Schema::table('dogadjaji', function (Blueprint $table) {
            $table->foreignId('lokacija_id')->nullable()->references('id')->on('lokacije')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dogadjaji', function (Blueprint $table) {
            $table->dropForeign('lokacija_id');
            $table->dropForeign('user_id');
        });
    }
};
