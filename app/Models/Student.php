<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name', 'email', 'dob', 'father_name', 'phone',
        'address', 'city', 'state', 'country',
        'passport_no', 'visa_no', 'college_code', 'created_by'
    ];

    // Relationship with College
    public function college()
    {
        return $this->belongsTo(College::class, 'college_code', 'code');
    }
}
