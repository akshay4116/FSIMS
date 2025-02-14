<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class College extends Model
{
    use HasFactory;

    protected $fillable = ['college_name', 'college_code', 'college_email', 'college_address', 'college_state', 'college_city', 'college_phone_number'];

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'college_code', 'college_code');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'college_code', 'college_code');
    }
}

