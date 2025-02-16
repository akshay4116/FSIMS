<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;


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
            $students = Student::all(); // ✅ Fetch all students without 'with' relation
        } else {
            $students = Student::where('college_code', $user->college_code)->get(); // ✅ Only students from college
        }

        \Log::info('Fetched Students:', ['students' => $students->toArray()]); // ✅ Debugging Log

        return Inertia::render('StudentList', [
            'auth' => ['user' => $user],
            'students' => $students // ✅ Pass students correctly
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
            'student' => $student ?? null, // ✅ Pass Student Data
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
        try {
            \Log::info('Student registration request received:', $request->all()); // Log the request data

            $user = Auth::user();

            // Assign college code: Admin selects, College users get their own
            $collegeCode = $user->user_role === 'admin' ? $request->collegeCode : $user->college_code;

            // Create Student User in `users` table
            $newUser = User::create([
                'user_email' => $request->email,
                'user_password' => Hash::make($request->password), // Default password
                'user_role' => 'student',
                'college_code' => $collegeCode,
            ]);

            // Create Student Profile in `students` table
            Student::create([
                'student_name' => $request->studentName,
                'student_email' => $request->email,
                'student_phone_number' => $request->phoneNumber,
                'student_dob' => $request->dob, // No validation
                'student_father_name' => $request->fatherName,
                'student_address' => $request->address,
                'student_city' => $request->city,
                'student_state' => $request->state,
                'student_country' => $request->countryname,
                'student_passport_number' => $request->passportNumber,
                'student_visa_number' => $request->visaNumber,
                'student_visa_status' => 'Pending', // Default status
                'college_code' => $collegeCode,
                'college_comments' => '', // Default empty
                'admin_comments' => '', // Default empty
            ]);

            \Log::info('Student registered successfully:', ['email' => $request->email]);

            return redirect()->back()->with('success', 'Student registered successfully!');
        } catch (\Exception $e) {
            \Log::error('Error registering student: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to register student.');
        }
    }

    public function view($id)
    {
        $user = Auth::user();

        // ✅ Fetch student
        $student = Student::findOrFail($id);

        // ✅ Admin can view all students, College users can only view students in their own college
        if ($user->user_role === 'admin' || ($user->user_role === 'college' && $student->college_code === $user->college_code)) {
            return Inertia::render('StudentView', [
                'auth' => ['user' => $user],
                'student' => $student
            ]);
        }

        // ❌ Unauthorized access, return 403 Forbidden
        abort(403, 'Unauthorized Access');
    }

    public function edit($id)
    {
        $user = Auth::user();
        $student = Student::findOrFail($id);

        // ✅ Admin can edit all students, College users can only edit students from their own college
        if ($user->user_role === 'admin' || ($user->user_role === 'college' && $student->college_code === $user->college_code)) {
            return Inertia::render('StudentEdit', [
                'auth' => ['user' => $user],
                'student' => $student
            ]);
        }

        abort(403, 'Unauthorized Access');
    }
    public function update(Request $request, $id)
    {
        try {
            \Log::info('Student update request received:', $request->all());

            $student = Student::findOrFail($id);
            $student->update([
                'student_name' => $request->studentName,
                'student_phone_number' => $request->phoneNumber,
                'student_dob' => $request->dob,
                'student_father_name' => $request->fatherName,
                'student_address' => $request->address,
                'student_city' => $request->city,
                'student_state' => $request->state,
                'student_country' => $request->countryname,
                'student_visa_status' => $request->visaStatus,
                'college_comments' => $request->collegeComments, // ✅ Fix: Save college comments
                'admin_comments' => $request->adminComments, // ✅ Fix: Save admin comments
            ]);

            // ✅ Update password only if provided
            if ($request->filled('password')) {
                User::where('user_email', $student->student_email)->update([
                    'user_password' => Hash::make($request->password)
                ]);
            }

            \Log::info('Student updated successfully:', ['id' => $id]);

            return Inertia::render('StudentEdit', [
                'auth' => [
                    'user' => Auth::user(),
                ],
                'student' => $student, // ✅ Send the updated student object
            ])->with('success', 'Student updated successfully!');


        } catch (\Exception $e) {
            \Log::error('Error updating student: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to update student.']);
        }
    }





}
