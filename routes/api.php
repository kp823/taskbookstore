<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::Class,'login']);
    Route::post('logout', [AuthController::Class,'logout']);
    Route::post('token', [AuthController::Class,'refresh']);
    Route::post('/', [AuthController::Class,'index']);
});


Route::group(['middleware' => 'api'], function () {
    Route::group(['prefix' => "book"], function () {
        Route::get('/', 'BookController@index');
        Route::get('/{id}', 'BookController@index');
        Route::post('/', 'BookController@store');
        Route::patch('/{id}', 'BookController@store');
        Route::delete('/{id}', 'BookController@destroy');
    });

    Route::group(['prefix' => "bookshow"], function () {
        Route::get('/', 'BookShowController@index');
        Route::get('/{id}', 'BookShowController@show');
    });
});
