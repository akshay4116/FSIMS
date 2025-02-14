<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['user_email', 'user_password', 'user_role', 'college_code'];
    protected $hidden = ['user_password'];

    protected $casts = [
        'password' => 'hashed',
    ];

    // ✅ If the user is a college, link to the college
    public function college()
    {
        return $this->belongsTo(College::class, 'college_code', 'college_code');
    }

    // ✅ If the user is a student, link to the student
    public function student()
    {
        return $this->hasOne(Student::class);
    }
}
