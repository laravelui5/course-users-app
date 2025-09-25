<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use LaravelUi5\Core\Middleware\FetchCsrfToken;
use LaravelUi5\Core\Middleware\ResolveUi5Context;
use LaravelUi5\Core\Middleware\VerifyCsrfToken;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(replace: [
            ValidateCsrfToken::class => VerifyCsrfToken::class
        ]);
        $middleware->appendToGroup('web', [
            FetchCsrfToken::class,
            ResolveUi5Context::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
