<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_name');
            $table->string('student_email')->unique();
            $table->string('student_phone_number');
            $table->date('student_dob');
            $table->string('student_father_name');
            $table->string('student_address');
            $table->string('student_city');
            $table->string('student_state');
            $table->string('student_country');
            $table->string('student_passport_number')->unique();
            $table->string('student_visa_number')->unique();
            $table->enum('student_visa_status', ['Pending', 'Approved', 'Rejected']);
            $table->string('college_code');
            $table->foreign('college_code')->references('college_code')->on('colleges')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
