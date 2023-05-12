<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

use Illuminate\Support\Facades\Auth;
use JWTAuth;

class Authenticate extends Middleware
{

    function handle($request, Closure $next, ...$guards)
    {
        try {
            $jwt = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            $jwt = false;
        }

        return $next($request);
    }
}
