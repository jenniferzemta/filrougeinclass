<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    //
    protected $fillable = ['id', 'creneau_id', 'salle_id', 'matiere_id', 'enseignant_id', 'groupe_etudiants'];
    
    public function creneau() {
        return $this->belongsTo(Creneau::class);
    }
    
    public function salle() {
        return $this->belongsTo(Salle::class);
    }
    
    public function matiere() {
        return $this->belongsTo(Matieres::class);
    }
    
    public function enseignant() {
        return $this->belongsTo(User::class, 'enseignant_id');
    }
}
