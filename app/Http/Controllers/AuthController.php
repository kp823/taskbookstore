<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Password;
use App\User;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'reset', 'forgot']]);
    }

    public function login()
    {
        $credential = request(['email', 'password']);
        $token = auth()->attempt($credential);
        return !$token ? response()->json(['error' => "Unauthorized"], 403) : $this->createNewToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    public function userProfile()
    {
        return response()->json(auth()->user());
    }

    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

}
