<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('email')->nullable()->default(null)->change();
            $table->string('first_name')->nullable()->default(null)->change();
            $table->string('last_name')->nullable()->default(null)->change();
            $table->string('mobile_number')->nullable()->default(null)->change();
            $table->string('role')->default("Normal")->change();
            $table->string('position')->nullable()->default(null)->change();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
