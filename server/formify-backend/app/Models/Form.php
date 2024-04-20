<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['name', 'slug', 'description', 'allowed_domains', 'limit_one_response', 'creator_id'];

    public function questions()
    {
        return $this->hasMany(Question::class, 'form_id', 'id');
    }
    public function response()
    {
        return $this->hasMany(Response::class, 'form_id', 'id');
    }
}
