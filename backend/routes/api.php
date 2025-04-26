<?php

use App\Http\Controllers\MatieresController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\RaController;
use App\Models\User;

Route::get('/user', function (Request $request) {
   
  
    return $request->user();
    
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// // Réinitialisation mot de passe
// Route::post('/forgot-password', [PasswordController::class, 'sendResetLink']);
// Route::post('/reset-password', [PasswordController::class, 'reset']);


Route::post('/forgot-password', [AuthController::class, 'sendResetLink'])->middleware('guest');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('guest');

Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
    ->middleware(['signed'])->name('verification.verify');

Route::post('/email/verification-notification', [AuthController::class, 'resendVerification'])
    ->middleware(['auth:sanctum', 'throttle:6,1']);

//    profile
    Route::put('/profile', [ProfileController::class, 'updateProfile']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);

    // Départements
    Route::apiResource('departments', DepartmentController::class);
  
    //salles
    Route::apiResource('salles', SalleController::class);
    // matieres
    Route::apiResource('matieres', MatieresController::class);
    //cours
    Route::apiResource('cours', CoursController::class);

    // routes/api.php
Route::get('/users', function() {
    return User::all();
});
// routes/api.php
   Route::middleware(['auth:sanctum'])->prefix('ra')->group(function () {
   
   
   
    
    // Emploi du temps
    Route::post('/emploi-temps/generate', [RaController::class, 'generateEmploiTemps']);
});

