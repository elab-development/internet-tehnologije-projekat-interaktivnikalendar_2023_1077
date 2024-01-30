<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dogadjaj>
 */
class DogadjajFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->company,
            'adresa' => $this->faker->address,
            'grad' => $this->faker->city,
            'drzava' => $this->faker->country,
            'poštanski_kod' => $this->faker->postcode,
        ];
    }
}
