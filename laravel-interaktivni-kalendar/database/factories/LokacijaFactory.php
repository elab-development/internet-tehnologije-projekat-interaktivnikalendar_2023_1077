<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lokacija>
 */
class LokacijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->sentence,
            'opis' => $this->faker->paragraph,
            'datum_pocetka' => $this->faker->dateTimeBetween('now', '+1 week'),
            'datum_zavrsetka' => $this->faker->dateTimeBetween('+1 week', '+2 weeks'),
            'lokacija_id' => $this->faker->numberBetween(1,10),
            'user_id' => $this->faker->numberBetween(1,5),
        ];
    }
}
