<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Inertia\Inertia;

class AuthController extends Controller
{
    // ✅ Show Login Page
    public function showLogin()
    {
        return Inertia::render('Login');
    }

    // ✅ Handle Login
    public function login(Request $request)
    {
        $request->validate([
            'user_email' => 'required|email',
            'user_password' => 'required'
        ]);

        $user = User::where('user_email', $request->user_email)->first();

        if (!$user || !Hash::check($request->user_password, $user->user_password)) {
            return back()->withErrors(['error' => 'Invalid credentials']);
        }

        Auth::login($user);

        return redirect($this->redirectTo($user));
    }

    // ✅ Redirect Based on Role
    private function redirectTo($user)
    {
        switch ($user->user_role) {
            case 'admin':
                return '/admin/dashboard';
            case 'college':
                return '/college/dashboard';
            case 'student':
                return '/student/dashboard';
            default:
                return '/';
        }
    }

    // ✅ Logout
    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/');
    }
}

