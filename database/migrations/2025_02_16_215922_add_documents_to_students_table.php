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
        Schema::table('students', function (Blueprint $table) {
            $table->string('passport_copy')->nullable()->after('admin_comments');
            $table->string('visa_document')->nullable()->after('passport_copy');
            $table->string('academic_certificate')->nullable()->after('visa_document');
        });
    }

    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn(['passport_copy', 'visa_document', 'academic_certificate']);
        });
    }
};
