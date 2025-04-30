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
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EmploiTempsController;
use App\Http\Controllers\OffreStageController;
use App\Http\Controllers\EtudiantProfileController;
use App\Http\Controllers\OffreController;

Route::get('/user', function (Request $request) {
   
  
    return $request->user();
    
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('etudiant/profile')->group(function () {
        Route::get('/', [EtudiantProfileController::class, 'show']);
        Route::put('/', [EtudiantProfileController::class, 'update']);
    });
});
   

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

    //emplodetemps
    Route::apiResource('edt' , EmploiTempsController::class);
    Route::get('edt/cours' , [EmploiTempsController::class, 'cours']);
    // routes/api.php
    //recuperer tous les users
    Route::get('/users', function() {
        return User::all();
    });

    Route::apiResource('offre', OffreController::class);
    Route::patch('offre/{id}/toggle-statut', [OffreController::class, 'toggleStatut']);

    //etudiant
    Route::get('/offres', [OffreController::class, 'activeStatut']);
    Route::get('/offres/{id}/download', [OffreController::class, 'downloadImage']);
    // Routes pour l'étudiant
    Route::prefix('etudiant')->group(function () {
    Route::get('/offres', [EtudiantController::class, 'index']);
    Route::get('/offres/{id}/download', [EtudiantController::class, 'downloadImage']);
   
});

// routes/api.php
   Route::middleware(['auth:sanctum'])->prefix('ra')->group(function () {
   
   
   
    
    // Emploi du temps
    Route::post('/emploi-temps/generate', [RaController::class, 'generateEmploiTemps']);
});

