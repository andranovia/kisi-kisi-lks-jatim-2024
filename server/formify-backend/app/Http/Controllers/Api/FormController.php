<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormPostRequest;
use App\Http\Resources\FormResource;
use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormController extends Controller
{
    public function post(FormPostRequest $request)
    {
        $user = Auth::user();
        $formData = $request->all();
        $formData['allowed_domains'] = json_encode($formData['allowed_domains']);
        $formData['creator_id'] = $user->id;
        Form::create($formData);


        return response()->json([
            'message' => 'Create form success',
            'form' =>  $formData
        ], 200);
    }
    public function get()
    {
        $forms = Form::get();

        return FormResource::collection($forms);
    }
    public function show(string $slug)
    {
        $user = Auth::user();
        $form = Form::where('slug',  $slug)->first();
        $allowed_domains = json_decode($form->allowed_domains);
        $user_email = $user->email;
        $email_domains = substr($user_email, strpos($user_email, '@') + 1);

        if ($form) {
            if (in_array($email_domains, $allowed_domains)) {
                $form->questions;
                return response()->json([
                    "message" => "Get form success",
                    'form' => $form,
                ], 200);
            } else {
                return response()->json([
                    "message" => "Forbidden access",
                ], 403);
            }
        } else {
            return response()->json([
                "message" => "Form not found",
            ], 404);
        }
    }
}
