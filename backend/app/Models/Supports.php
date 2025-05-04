<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supports extends Model
{
    //

    use HasFactory;
     protected $fillable= [
        'title',
        'file_path',
        'matiere_id',
      
     ];


    public function matieres() {
        return $this->belongsTo(Matieres::class);
    }
}
