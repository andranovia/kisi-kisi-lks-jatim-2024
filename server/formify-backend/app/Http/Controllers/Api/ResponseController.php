<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResponseRequest;
use App\Models\Form;
use App\Models\Question;
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
        $answers = $request->input('answers');


        if (in_array($user_domains, $allowed_domains)) {
            if ($form->limit_one_response) {

                $existed_response = $form->responses()->where('user_id', $user->id)->first();
                if ($existed_response) {
                    return response()->json(['message' => "You can not submit form twice"], 422);
                }

                foreach ($answers as $answer) {
                    $answer['form_id'] = $form->id;
                    $answer['user_id'] = $user->id;
                    Response::create($answer);
                }

                return response()->json([
                    'message' => 'Submit response success',
                ], 200);
            }
        } else {
            return response()->json([
                "message" => "Forbidden access"
            ], 403);
        }
    }

    public function get(string $slug)
    {
        $user = Auth::user();
        $form = Form::where('slug', $slug)->first();
        $response_data = Response::get();

        $responses = [];

        if ($form) {
            if ($form->id === $user->id) {
                foreach ($response_data as $response) {
                    $user_answers = Response::where('form_id', $response->form_id)->where('user_id', $response->user_id)->get();
                    $answers = new \stdClass();
                    foreach ($user_answers as $answer) {
                        $question = Question::where('id', $answer->question_id)->first();
                        $answers->{$question->name} = $answer->value;
                    }

                    $user_response['date'] = $response->created_at;
                    $user_response['user'] = [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'email_verified_at' => $user->email_verified_at
                    ];
                    $user_response['answers'] = $answers;

                    $responses[] =    $user_response;
                };
                return  response()->json([
                    "message" => "Get responses success",
                    "responses" => $responses
                ], 200);
            } else {
                return response()->json([
                    "message" => "Forbidden access"
                ], 403);
            }
        } else {
            return response()->json([
                "message" => "Form not found"
            ], 404);
        }
    }
}
