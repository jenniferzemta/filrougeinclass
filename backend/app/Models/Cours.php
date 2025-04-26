<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Cours extends Model
{
    //
   use HasFactory;

    protected $fillable = [
        'salles_id',
        'matieres_id',
        'enseignant_id',
        'periodicite',
        'heure_deb',
        'heure_fin',
        'date',
        'status'
       
    ];

    public function salle()
    {
        return $this->belongsTo(Salle::class,'salles_id');
    }

    public function matiere()
    {
        return $this->belongsTo(Matieres::class, 'matieres_id');
    }

    public function enseignant()
    {
        return $this->belongsTo(User::class, 'enseignant_id') ->where('role', 'enseignant');;
    }
}
