<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'user_id',
        'date_naissance',
        'telephone',
        'filiere',
        'niveau_etude',
        'photo',
        'adresse'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function getPhotoUrlAttribute()
    {
        return $this->photo ? asset('storage/'.$this->photo) : null;
    }
}
