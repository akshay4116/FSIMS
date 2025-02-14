<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        // Get the logged-in user
        $user = Auth::user();

        // Check if user exists and has the correct role
        if (!$user || $user->user_role !== $role) {
            abort(403, 'Unauthorized access.'); // Return 403 Forbidden
        }

        return $next($request);
    }
}
