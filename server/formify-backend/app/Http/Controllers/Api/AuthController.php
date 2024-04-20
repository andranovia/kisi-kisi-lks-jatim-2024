<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $email = $request->email;
        $password = $request->password;

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $user = User::where('email', $email)->first();

            if ($user) {
                $return_data = [
                    'name' => $user->name,
                    'email' => $user->email,
                    'accessToken' => $user->createToken('auth_token')->plainTextToken,
                ];

                return response()->json([
                    'success' => true,
                    'user' => $return_data
                ]);
            } else {

                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }
        } else {

            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }
    }
    public function logout(Request $request)
    {
        $authorizationHeader = $request->header('Authorization');
        if ($authorizationHeader) {
            $user = $request->user();
            $user->currentAccessToken()->delete();

            return response()->json(['message' => 'Logged out successfully'], 200);
        }
    }
}
