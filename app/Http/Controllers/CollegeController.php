<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\College;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;



class CollegeController extends Controller
{
    public function create()
    {
        return Inertia::render('AddCollege', [
            'auth' => ['user' => Auth::user()]
        ]);
    }
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

    public function store(Request $request)
    {
        Log::info('College registration request received:', $request->all()); // ✅ Log Data

        // ✅ Insert College Data into `colleges` table
        College::create([
            'college_name' => $request->collegeName,
            'college_code' => $request->collegeCode,
            'college_email' => $request->collegeEmail,
            'college_address' => $request->collegeAddress,
            'college_state' => $request->collegeState,
            'college_city' => $request->collegeCity,
            'college_phone_number' => $request->collegePhoneNumber,
        ]);

        // ✅ Insert College User into `users` table
        \App\Models\User::create([
            'user_email' => $request->collegeEmail,
            'user_password' => Hash::make($request->password),
            'user_role' => 'college',
            'college_code' => $request->collegeCode,
        ]);

        return back()->with('success', 'College added successfully!');
    }

    public function view($id)
    {
        $user = Auth::user();

        // ✅ Fetch College Details
        $college = College::find($id);

        if (!$college) {
            abort(404, 'College Not Found');
        }

        return Inertia::render('CollegeView', [
            'auth' => ['user' => $user],
            'college' => $college
        ]);
    }

    public function edit($id)
    {
        $college = College::findOrFail($id);

        return Inertia::render('CollegeEdit', [
            'auth' => ['user' => Auth::user()],
            'college' => $college
        ]);
    }


    public function update(Request $request, $id)
    {
        try {
            \Log::info('College update request received:', $request->all());

            $college = College::findOrFail($id);
            $college->update([
                'college_name' => $request->collegeName,
                'college_phone_number' => $request->phoneNumber,
                'college_address' => $request->address,
                'college_city' => $request->city,
                'college_state' => $request->state,
            ]);

            // ✅ Update password only if provided
            if ($request->filled('password')) {
                User::where('college_code', $college->college_code)
                    ->where('user_role', 'college')
                    ->update(['user_password' => Hash::make($request->password)]);
            }

            \Log::info('College updated successfully:', ['id' => $id]);

            return redirect()->back()->with('success', 'College updated successfully!');
        } catch (\Exception $e) {
            \Log::error('Error updating college: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to update college.']);
        }
    }

    public function destroy($id)
    {
        try {
            $college = College::findOrFail($id);

            // ✅ Check if students exist for this college
            $studentsExist = \App\Models\Student::where('college_code', $college->college_code)->exists();
            if ($studentsExist) {
                return Inertia::render('CollegeList', [
                    'auth' => ['user' => Auth::user()],
                    'colleges' => College::all(),
                    'errorMessage' => 'Cannot delete this college as student records exist!'
                ]);
            }

            // ✅ Find and delete corresponding user
            $user = User::where('college_code', $college->college_code)
                ->where('user_role', 'college')
                ->first();

            if ($user) {
                $user->delete();
            }

            // ✅ Delete college record
            $college->delete();

            \Log::info('College deleted successfully:', ['id' => $id]);

            return Inertia::render('CollegeList', [
                'auth' => ['user' => Auth::user()],
                'colleges' => College::all(),
                'successMessage' => 'College deleted successfully!'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error deleting college: ' . $e->getMessage());
            return Inertia::render('CollegeList', [
                'auth' => ['user' => Auth::user()],
                'colleges' => College::all(),
                'errorMessage' => 'Failed to delete college.'
            ]);
        }
    }




}
