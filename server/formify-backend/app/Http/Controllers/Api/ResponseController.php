<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseRequest;
use App\Models\Form;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResponseController extends Controller
{
    public function post(ResponseRequest $request, string $slug)
    {
        $user = Auth::user();
        $form = Form::where('slug', $slug)->first();
        $allowed_domains = json_decode($form->allowed_domains);
        $user_domains = substr($user->email, strpos($user->email, '@') + 1);
        $answers = $request->all();


        if (in_array($user_domains, $allowed_domains)) {
            if ($form->limit_one_response) {


                // $existed_response = $form->responses()->where('user_id', $user->id)->first();
                // if ($existed_response) {
                //     return response()->json(['message' => "You can not submit form twice"], 422);
                // }


                return $answers;
            }
        } else {
            return response()->json([
                "message" => "Forbidden access"
            ], 403);
        }
    }
}
