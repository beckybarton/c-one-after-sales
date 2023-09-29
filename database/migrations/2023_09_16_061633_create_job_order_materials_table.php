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
        Schema::create('job_order_materials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_order_id');
            $table->string('material')->default(null);
            $table->double('amount')->default(null);
            $table->timestamps();
            $table->foreign('job_order_id')
              ->references('id')
              ->on('job_orders')
              ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_order_materials');
    }
};
