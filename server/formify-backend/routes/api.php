<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FormController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\ResponseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
    });
    Route::middleware('auth:sanctum')->prefix('forms')->group(function () {
        Route::post('/', [FormController::class, 'post']);
        Route::get('/', [FormController::class, 'get']);
        Route::get('/{slug}', [FormController::class, 'show']);
        Route::post('{form_slug}/questions', [QuestionController::class, 'post']);
        Route::post('{form_slug}/questions', [QuestionController::class, 'post']);
        Route::post('{form_slug}/responses', [ResponseController::class, 'post']);
    });
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
