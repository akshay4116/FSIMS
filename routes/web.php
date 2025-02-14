<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
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

// Named login route
Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login'); // ✅ Add this named route

// Root route (optional: can also redirect to login)
Route::get('/', function () {
    return redirect()->route('login'); // ✅ Redirect to named login route
});
Route::get('/admin/dashboard', function () {
    return Inertia::render('AdminDashboard', ['auth' => ['user' => ['name' => 'Admin', 'role' => 'admin']]]);
});
Route::get('/admin/colleges', function () {
    return Inertia::render('CollegeList', ['auth' => ['user' => ['name' => 'Admin', 'role' => 'admin']]]);
});
// Admin Student List Route
Route::get('/admin/students', function () {
    return Inertia::render('StudentList', ['auth' => ['user' => ['name' => 'Admin', 'role' => 'admin']]]);
});
// College Student List Route
Route::get('/college/students', function () {
    return Inertia::render('StudentList', ['auth' => ['user' => ['name' => 'College A', 'role' => 'college']]]);
});
// College Dashboard Route
Route::get('/college/dashboard', function () {
    return Inertia::render('CollegeDashboard', ['auth' => ['user' => ['name' => 'ABC Engineering College', 'role' => 'college']]]);
});
// Student Dashboard Route
Route::get('/student/dashboard', function () {
    return Inertia::render('StudentDashboard', ['auth' => ['user' => ['name' => 'John Doe', 'role' => 'student']]]);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/register-student', [StudentController::class, 'create']);
    Route::post('/admin/register-student', [StudentController::class, 'store']);
});

Route::middleware(['auth', 'role:college'])->group(function () {
    Route::get('/college/register-student', [StudentController::class, 'create']);
    Route::post('/college/register-student', [StudentController::class, 'store']);
});