<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CollegeController;
use App\Http\Controllers\AdminController;


Route::get('/', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth')->group(function () {



    Route::middleware(['auth', 'role:admin'])->get('/admin/dashboard', [AdminController::class, 'dashboard']);


    Route::middleware(['auth', 'role:college'])->get('/college/dashboard', [CollegeController::class, 'dashboard']);

    Route::middleware(['auth', 'role:student'])->get('/student/dashboard', [StudentController::class, 'dashboard']);


    Route::get('/admin/colleges', [CollegeController::class, 'index']);
    Route::get('/admin/add-college', [CollegeController::class, 'create']);
    Route::post('/admin/store-college', [CollegeController::class, 'store']);
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

    Route::middleware(['auth', 'role:admin'])->group(function () {
        Route::get('/admin/register-student', [StudentController::class, 'create']);
        Route::post('/admin/register-student', [StudentController::class, 'store']);
    });

    Route::middleware(['auth', 'role:college'])->group(function () {
        Route::get('/college/register-student', [StudentController::class, 'create']);
        Route::post('/college/register-student', [StudentController::class, 'store']);
    });

    Route::get('/admin/view-student/{id}', [StudentController::class, 'view'])->middleware(['auth']);
    Route::get('/college/view-student/{id}', [StudentController::class, 'view'])->middleware(['auth']);

    Route::middleware(['auth', 'role:admin'])->group(function () {
        Route::get('/admin/edit-student/{id}', [StudentController::class, 'edit']);
        Route::post('/admin/update-student/{id}', [StudentController::class, 'update']); // 🔥 Use POST instead of PUT
    });

    Route::middleware(['auth', 'role:college'])->group(function () {
        Route::get('/college/edit-student/{id}', [StudentController::class, 'edit']);
        Route::post('/college/update-student/{id}', [StudentController::class, 'update']); // 🔥 Use POST instead of PUT
    });




});
