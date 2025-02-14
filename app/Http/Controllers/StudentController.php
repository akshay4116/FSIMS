<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\College;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Show the student registration form.
     */
    public function create()
    {
        // Fetch colleges for the dropdown (only active colleges)
        $colleges = College::orderBy('name', 'asc')->get();

        return inertia('Student/Register', [
            'colleges' => $colleges,
        ]);
    }

    /**
     * Store a newly registered student.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'full_name'     => 'required|string|max:255',
            'email'         => 'required|email|unique:students,email',
            'dob'           => 'required|date|before:today',
            'father_name'   => 'required|string|max:255',
            'phone'         => 'required|digits:10|unique:students,phone',
            'address'       => 'required|string|max:500',
            'city'          => 'required|string|max:255',
            'state'         => 'required|string|max:255',
            'country'       => 'required|string|max:255',
            'passport_no'   => 'required|string|unique:students,passport_no',
            'visa_no'       => 'required|string|unique:students,visa_no',
            'college_code'  => 'required|exists:colleges,code',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Create a new student
        Student::create([
            'full_name'     => $request->full_name,
            'email'         => $request->email,
            'dob'           => $request->dob,
            'father_name'   => $request->father_name,
            'phone'         => $request->phone,
            'address'       => $request->address,
            'city'          => $request->city,
            'state'         => $request->state,
            'country'       => $request->country,
            'passport_no'   => $request->passport_no,
            'visa_no'       => $request->visa_no,
            'college_code'  => $request->college_code,
            'created_by'    => auth()->user()->id, // Store who added the student
        ]);

        return redirect()->route(auth()->user()->role === 'admin' ? 'admin.students' : 'college.students')
                         ->with('success', 'Student registered successfully.');
    }
}
