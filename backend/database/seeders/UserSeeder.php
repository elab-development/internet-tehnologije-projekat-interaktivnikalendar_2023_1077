<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=>"Administrator",
            'email'=>"admin@gmail.com",
            'password' =>  "admin",
            'isAdmin' => true,
            'remember_token' => Str::random(10),
        ]);

        User::factory()->times(4)->create();
    }
}
