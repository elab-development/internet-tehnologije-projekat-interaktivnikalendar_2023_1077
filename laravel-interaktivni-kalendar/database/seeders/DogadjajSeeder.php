<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Dogadjaj;

class DogadjajSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            Dogadjaj::factory()->create([
                'lokacija_id' => rand(1, 10),
                'user_id' => rand(2,5),
            ]);
        }
    }
}
