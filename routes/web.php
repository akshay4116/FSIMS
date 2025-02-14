<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CollegeController;
use App\Http\Controllers\AdminController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth')->group(function () {

    Route::middleware(['auth', 'role:admin'])->get('/admin/dashboard', [AdminController::class, 'dashboard']);


    Route::middleware(['auth', 'role:college'])->get('/college/dashboard', [CollegeController::class, 'dashboard']);

    Route::middleware(['auth', 'role:student'])->get('/student/dashboard', [StudentController::class, 'dashboard']);


    Route::middleware(['auth', 'role:admin'])->get('/admin/colleges', [CollegeController::class, 'index']);

    Route::middleware(['auth', 'role:admin'])->get('/admin/students', [StudentController::class, 'index']);
    Route::middleware(['auth', 'role:college'])->get('/college/students', [StudentController::class, 'index']);

    // ✅ Logout Route
    Route::post('/logout', function () {
        Auth::logout();
        session()->invalidate();
        session()->regenerateToken();
        return redirect('/')->withHeaders([
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma' => 'no-cache',
            'Expires' => 'Fri, 01 Jan 1990 00:00:00 GMT',
        ]);
    })->name('logout');

    // ✅ Admin Routes: Only Admins Can Register Students
    Route::middleware(['auth', 'role:admin'])->group(function () {
        Route::get('/admin/register-student', [StudentController::class, 'create'])->name('admin.register-student');
        Route::post('/admin/register-student', [StudentController::class, 'store']);
    });

    // ✅ College Routes: Only Colleges Can Register Their Own Students
    Route::middleware(['auth', 'role:college'])->group(function () {
        Route::get('/college/register-student', [StudentController::class, 'create'])->name('college.register-student');
        Route::post('/college/register-student', [StudentController::class, 'store']);
    });


});
