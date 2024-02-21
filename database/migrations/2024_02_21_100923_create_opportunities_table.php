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
        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->float('estimatevalue');
            $table->string('currency');
            $table->date('estimateclosuredate');
            $table->string('accountowner');
            $table->string('clientid');
            $table->string('contactperson');
            $table->string('phone');
            $table->string('email');
            $table->string('stage');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opportunities');
    }
};
