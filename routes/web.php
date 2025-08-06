<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AminoController;
use App\Http\Controllers\Orominer1Controller;
use App\Http\Controllers\CodeTestingController;

Route::get('/notused', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', function () {
    return Inertia::render('VotesApp');
});

Route::get('/portfolio', function () {
    return Inertia::render('Portfolio');
});


Route::get('/amino', function () {
    return Inertia::render('Amino');
});



Route::get('/orominer1', function () {
    return Inertia::render('Orominer1');
});


Route::get('/drawingcanvas', function () {
    return Inertia::render('DrawingCanvas');
});

Route::get('/migrations', [AminoController::class, 'view_migrations']);

Route::get('/codetesting', [CodeTestingController::class, 'code_testing']);

Route::get('/frontcodetesting', function() {
    return view('codetesting',['name' => 'Richard']);
});

Route::get('/minimotifsize', [AminoController::class, 'miniMotif_size']);


Route::post('/makerequest', [AminoController::class, 'index']);

Route::get('/checkstatus', [AminoController::class, 'checkStatus']);


Route::get('/getxmlfile', [Orominer1Controller::class, 'get_xml_file']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
