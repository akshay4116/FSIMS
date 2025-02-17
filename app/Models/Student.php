<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_name',
        'student_email',
        'student_phone_number',
        'student_dob',
        'student_father_name',
        'student_address',
        'student_city',
        'student_state',
        'student_country',
        'student_passport_number',
        'student_visa_number',
        'student_visa_status',
        'college_code',
        'college_comments',
        'admin_comments',
        'passport_copy',
        'visa_document',
        'academic_certificate',
    ];

    public function college(): BelongsTo
    {
        return $this->belongsTo(College::class, 'college_code', 'college_code');
    }
}
