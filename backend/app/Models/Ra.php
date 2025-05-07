<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ra extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'user_id',
        'telephone',
        'specialite',
        'grade',
        'adresse',
        'date_naissance',
        'bureau',
        'photo'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
