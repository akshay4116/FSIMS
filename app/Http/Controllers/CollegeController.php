<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\College;
use App\Models\Student;

class CollegeController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->user_role !== 'admin') {
            return redirect('/')->withErrors(['error' => 'Unauthorized Access']);
        }

        // ✅ Fetch all colleges
        $colleges = College::all();

        return Inertia::render('CollegeList', [
            'auth' => ['user' => $user],
            'colleges' => $colleges ?? [] // Ensure it's always an array
        ]);
    }

    public function dashboard()
    {
        $user = Auth::user();

        // ✅ Fetch the college details based on the logged-in user's `college_code`
        $college = College::where('college_code', $user->college_code)->first();

        if (!$college) {
            return redirect('/')->withErrors(['error' => 'College not found']);
        }

        // ✅ Fetch Student Stats (For This College)
        $totalStudents = Student::where('college_code', $user->college_code)->count();
        $visaPending = Student::where('college_code', $user->college_code)->where('student_visa_status', 'Pending')->count();
        $visaApproved = Student::where('college_code', $user->college_code)->where('student_visa_status', 'Approved')->count();
        $visaExpired = Student::where('college_code', $user->college_code)->where('student_visa_status', 'Expired')->count();

        return Inertia::render('CollegeDashboard', [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'user_email' => $user->user_email,
                    'user_role' => $user->user_role,
                    'college_code' => $user->college_code,
                ],
            ],
            'college' => $college, // ✅ Pass College Data
            'stats' => [
                'totalStudents' => $totalStudents,
                'visaPending' => $visaPending,
                'visaApproved' => $visaApproved,
                'visaExpired' => $visaExpired,
            ],
        ]);
    }
}
