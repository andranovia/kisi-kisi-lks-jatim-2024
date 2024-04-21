<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;

    protected $fillable = ['question_id', 'value', 'form_id', 'user_id'];
    public $timestamps = false;

    public function form()
    {
        return $this->belongsTo(form::class, 'form_id', 'id');
    }
}
