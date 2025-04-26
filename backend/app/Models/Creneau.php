<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Creneau extends Model
{
    //
    protected $fillable = ['id', 'jour', 'heure_debut', 'heure_fin'];
    
    public function seances() {
        return $this->hasMany(Seance::class);
    }
    
    // Helper pour format d'affichage
    public function getPlageHoraireAttribute() {
        return $this->heure_debut . ' - ' . $this->heure_fin;
    }
}
