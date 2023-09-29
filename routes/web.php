<?php

use Illuminate\Support\Facades\Route;

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
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JobOrderController;
// use PDF;
// \PDF::loadView(...);


// USER MANAGEMENT
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::post('/register', [RegisterController::class, 'registerSave'])->name('register.post');
Route::get('/users', [UserController::class, 'index'])->name('users');

// JOB ORDERS
Route::get('/dashboard', [DashboardController::class, 'index'])->name('index');
Route::post('/joborder', [JobOrderController::class, 'saveJobOrder'])->name('joborder.post');
Route::post('/approve-jo', [JobOrderController::class, 'approveJobOrder'])->name('joborder.approve');
Route::post('/quote-jo', [JobOrderController::class, 'quoteJobOrder'])->name('joborder.quote');
Route::post('/quote-decision', [JobOrderController::class, 'quotationDecision'])->name('joborder.quotationDecision');

// PDF FILES
// Route::get('/generate-quotation', [JobOrderController::class, 'generatequotation']);
Route::get('/generate-quotation/{jobOrderId}', [JobOrderController::class, 'generatequotation']);



Route::get('/', function () {
    // return view('login');
    return redirect()->route('login');
});
