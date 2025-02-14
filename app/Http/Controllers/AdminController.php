<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\College;
use App\Models\Student;

class AdminController extends Controller
{
    public function dashboard()
    {
        // ✅ Fetch Statistics from the database
        $totalColleges = College::count();
        $totalStudents = Student::count();
        $visaPending = Student::where('student_visa_status', 'Pending')->count();
        $visaApproved = Student::where('student_visa_status', 'Approved')->count();
        $visaExpired = Student::where('student_visa_status', 'Expired')->count();

        return Inertia::render('AdminDashboard', [
            'auth' => [
                'user' => auth()->user()
            ],
            'adminStats' => [
                'totalColleges' => $totalColleges,
                'totalStudents' => $totalStudents,
                'visaPending' => $visaPending,
                'visaApproved' => $visaApproved,
                'visaExpired' => $visaExpired,
            ]
        ]);
    }
}
