<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    /**
     * Show Student Registration Form.
     */
    public function index()
    {
        $user = Auth::user();

        // ✅ Admin sees ALL students, College sees only their students
        if ($user->user_role === 'admin') {
            $students = Student::with('college')->get(); // Admin gets all students
        } else {
            $students = Student::with('college')->where('college_code', $user->college_code)->get(); // College gets only their students
        }

        return Inertia::render('StudentList', [
            'auth' => ['user' => $user],
            'students' => $students
        ]);
    }

    public function dashboard()
    {
        $user = Auth::user();

        // ✅ Fetch the student details based on the logged-in user's email
        $student = Student::where('student_email', $user->user_email)->first();

        if (!$student) {
            return redirect('/')->withErrors(['error' => 'Student profile not found']);
        }

        return Inertia::render('StudentDashboard', [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'user_email' => $user->user_email,
                    'user_role' => $user->user_role,
                    'college_code' => $user->college_code,
                ],
            ],
            'student' => $student // ✅ Pass Student Data
        ]);
    }


    public function create()
    {
        // ✅ Only admins can select a college code manually.
        // ✅ Colleges automatically register students under their own `college_code`
        $colleges = Auth::user()->user_role === 'admin' ? \App\Models\College::all() : null;

        return Inertia::render('StudentRegistration', [
            'auth' => [
                'user' => Auth::user()
            ],
            'colleges' => $colleges
        ]);
    }

    /**
     * Store Student Data
     */
    public function store(Request $request)
    {
        // ✅ Admin must select a college_code, but college users get it automatically
        $collegeCode = Auth::user()->user_role === 'admin' ? $request->college_code : Auth::user()->college_code;

        // ✅ Validate input fields
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,user_email',
            'phone' => 'required|string|min:10|max:15',
            'dob' => 'required|date|before:today',
            'visa_number' => 'required|string|max:50',
            'college_code' => 'required_if:role,admin|exists:colleges,college_code',
            'college_comments' => 'nullable|string',
            'admin_comments' => 'nullable|string' // Only admin selects college
        ]);

        // ✅ Create Student User in `users` table
        $user = User::create([
            'user_email' => $request->email,
            'user_password' => Hash::make('password123'), // Default password (Admin/College can change it later)
            'user_role' => 'student',
            'college_code' => $collegeCode
        ]);

        // ✅ Create Student Profile in `students` table
        Student::create([
            'student_name' => $request->full_name,
            'student_email' => $request->email,
            'student_phone_number' => $request->phone,
            'student_dob' => $request->dob,
            'student_visa_number' => $request->visa_number,
            'student_visa_status' => 'Pending',
            'college_code' => $request->college_code,
            'college_comments' => $request->college_comments,
            'admin_comments' => $request->admin_comments
        ]);

        return redirect()->back()->with('success', 'Student registered successfully!');
    }
}
