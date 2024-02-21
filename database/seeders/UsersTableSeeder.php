<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;


class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User:: create([
        	'name'=>'Joe Prime',
        	'email'=>'joeasewe@gmail.com',
        	'password'=> Hash::make('password'),
        	'role'=>'user',
        	'status'=>'1',
        	'remember_token' =>Str::random(10),
        ]);

        DB::table('users')->insert([
            'name'=>Str::random(10)." ".Str::random(5),
            'email'=>Str::random(10)."@example.com",
            'password'=>Hash::make('password'),
            'role'=>'user',
            'status'=>'1',
            'remember_token' =>Str::random(10),
        ]);
    }
}
