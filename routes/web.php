<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OpportunityController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\TrailController;
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


Route::get('/',[AuthController::class,'index']);
Route::get('login',[AuthController::class,'index']);
Route::post('post-login',[AuthController::class,'postLogin']);
Route::get('registration',[AuthController::class,'registration']);
Route::post('post-registration',[AuthController::class,'postRegistration']);
Route::get('logout',[AuthController::class,'logout']);

Route::middleware('auth')->group(function(){

    Route::get('dashboard',[AuthController::class,'dashboard']);
    Route::get('getstaffs',[AuthController::class,'create']);
    Route::get('searchstaff/{id}',[AuthController::class,'searchstaff']);
    Route::post("edituser",[AuthController::class,'edit']);

    Route::get('leads',[OpportunityController::class,'index']);
    Route::post('opportunities',[OpportunityController::class,'store']);
    Route::get('leads/preview',[OpportunityController::class,'lead_summary']);
    Route::get('leads/create',[OpportunityController::class,'create']);
    Route::get("opportunities/summary",[OpportunityController::class,'getsummary']);
    Route::post("opportunities/update/{id}",[OpportunityController::class,'update']);
    Route::post("updatestage/{id}",[OpportunityController::class,'edit']);

    Route::post('lead/addtrail',[TrailController::class,'store']);
    Route::get('opportunities/show/{id}',[TrailController::class,'show']);
    Route::post('trail/destroy/{id}',[TrailController::class,'destroy']);


    Route::get('clients/show/{id}',[ClientsController::class,'show']);
    Route::get('clients/create',[ClientsController::class,'create']);

    Route::get('manageaccounts',[AuthController::class,'registration']);
    Route::post('createuser',[AuthController::class,'postRegistration']);

});