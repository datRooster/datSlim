<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Token;
class RememberMeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   
        if(!$request->user() && $request->hasCookie('remember_token')){
            $token = $request->cookie('remember_token');

            if($token){
                $user = Token::where('id', $token)
                ->where('revoked',false)
                ->first()
                ->user();
                if($user){
                    Auth::login($user);
                }
            }
        }
        return $next($request);
    }
}
