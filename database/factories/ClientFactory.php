<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Client;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Clients>
 */
class ClientFactory extends Factory
{

    /**
     * specify the model to be used
     */
    protected $model = Client::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'clientid'=>$this->faker->unique()->numberBetween(1,10),
            'clientname'=>$this->faker->unique()->name,
            'address'=>$this->faker->address,
            'contact'=>$this->faker->name,
            'phone'=>$this->faker->phoneNumber,
            'email'=>$this->faker->unique()->email,
            'email_1'=>$this->faker->unique()->email,
            'email_2'=>$this->faker->unique()->email,
            'status'=>$this->faker->randomElement(['Active','Locked'])
        ];
    }
}
