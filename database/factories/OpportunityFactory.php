<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Opportunity;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class OpportunityFactory extends Factory
{
     /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Opportunity::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
   

    public function definition(): array
    {
        return [
           'title'=>$this->faker->text(20),
           'description'=>$this->faker->text(40),
           'estimatevalue'=>$this->faker->randomFloat($nbMaxDecimals = NULL, $min = 0, $max = NULL),
           'currency'=>$this->faker->currencyCode('USD'),
           'estimateclosuredate'=>$this->faker->datetimeThisYear('+2 months'),
           'accountowner'=>$this->faker->numberBetween(1,5),
           'clientid'=>$this->faker->numberBetween(1,5),
           'contactperson'=>$this->faker->name,
           'phone'=>$this->faker->phoneNumber,
           'email'=>$this->faker->email,
           'stage'=>$this->faker->randomElement(['Closed','Ongoing','Cancelled']),
           'status'=>$this->faker->randomElement(['Closed','Ongoing','Cancelled']),

        ];
    }
}
