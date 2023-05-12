<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    protected $table = 'books';

    protected $fillable = ['id', 'total_pages','rating','title','author','genre','description','image','isbn','published','publisher'];

}
