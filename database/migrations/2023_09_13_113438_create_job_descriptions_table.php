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
        Schema::create('job_descriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_order_id')->nullable();
            $table->foreign('job_order_id')->references('id')->on('job_orders')->onDelete('cascade');
            $table->string('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_descriptions');
    }
};
