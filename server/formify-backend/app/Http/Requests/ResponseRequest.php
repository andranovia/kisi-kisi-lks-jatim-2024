<?php

namespace App\Http\Requests;

use App\Models\Question;
use Illuminate\Foundation\Http\FormRequest;

class ResponseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [];

        $answers = $this->input('answers');
        $rules['answers'] =  'required|array';
        if ($answers) {
            foreach ($answers as $answer) {
                $rules['answers.*.value'] = $this->validateAnswer($answer['question_id']);
            }
        }


        return $rules;
    }

    public function messages()
    {
        return [
            'answers.*.value' => 'The answer field is required.',
        ];
    }

    public function attributes()
    {
        return [
            'answers.*.value' => 'Value',
        ];
    }


    protected function validateAnswer($question_id)
    {

        $question = Question::where('id', $question_id)->first();
        if ($question->is_required) {
            return 'required';
        }

        return '';
    }
}
