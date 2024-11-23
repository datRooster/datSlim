<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Rotte Publiche
Route::post("auth/register"         ,[AuthController::class,                   "register"]);
Route::post("auth/login"            ,[AuthController::class,                      "login"]);

Route::post('auth/remember-me'      ,[AuthController::class, 'authenticateWithRememberMe'])->middleware('throttle:10,1');

// Rotte Protette
Route::group(["middleware" => ["auth:api"]],function(){
    Route::post("auth/logout"         ,[AuthController::class,      "logout"]);
    Route::get("dashboard"           ,[AuthController::class,   "dashboard"]);
});