<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DogadjajController;
use App\Http\Controllers\LokacijaController;
use App\Http\Controllers\IcsExportController;

//login i registracija
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

//resetovanje lozinke
Route::post('resetPassword',[AuthController::class,'resetPassword']);

//Svi Neulogovani
Route::resource('users', UserController::class);
Route::post('/export', [IcsExportController::class, 'export']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    //Mogu samo ulogovani korisnici, ne admin
    Route::get('dogadjaji', [DogadjajController::class, 'index']);
    Route::get('dogadjaji/{id}', [DogadjajController::class, 'show']); 
    Route::post('dogadjaji', [DogadjajController::class, 'store']);
    Route::put('dogadjaji/{id}', [DogadjajController::class, 'update']); 
    Route::patch('dogadjaji/updateOpis/{id}', [DogadjajController::class, 'updateOpis']);
    Route::delete('dogadjaji/{id}', [DogadjajController::class, 'destroy']); 

    //Mogu samo administratori
    Route::post('lokacije', [LokacijaController::class, 'store']);
    Route::put('lokacije/{id}', [LokacijaController::class, 'update']); 
    Route::delete('lokacije/{id}', [LokacijaController::class, 'destroy']);

    Route::post('logout', [AuthController::class, 'logout']);

});