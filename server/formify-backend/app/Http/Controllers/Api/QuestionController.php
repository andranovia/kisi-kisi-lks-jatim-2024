<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionRequest;
use App\Models\Form;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function post(QuestionRequest $request, string $slug)
    {
        $form = Form::where('slug', $slug)->first();

        $question_data = $request->all();
        $question_data['choices'] = json_encode($request->choices);
        $question_data['form_id'] = $form->id;
        $questions = Question::create($question_data)->first();

        return response()->json([
            'message' => 'Add questions success',
            'question' => $questions,
        ], 200);
    }

    public function delete(string $slug, string $id)
    {
        $user = Auth::user();
        $form = Form::where("slug", $slug)->first();
        $question = Question::where("id", $id)->first();

        if ($form) {
            if ($question) {
                if ($user->id ===  $form->creator_id) {
                    $question->delete();
                    return response()->json([
                        "message" => "Remove question success"
                    ], 200);
                } else {
                    return response()->json([
                        "message" => "Forbidden access"
                    ], 403);
                }
            } else {
                return response()->json([
                    "message" => "Question not found"
                ], 404);
            }
        } else {
            return response()->json([
                "message" => "Form not found"
            ], 404);
        }
    }
}
