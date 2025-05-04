<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Department;
use App\Models\Salle;
use App\Models\Supports;

class Matieres extends Model
{
    //
    protected $fillable = [
  
    'intitule', 
    'code', 
    'credits',
    'department_id'];



    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function seances() {
        return $this->hasMany(Seance::class);
    }
    // public function enseignants(): BelongsToMany
    // {
    //     return $this->belongsToMany(Enseignant::class, 'enseignant_matiere');
    // }

    public function salles(): BelongsToMany
    {
        return $this->belongsToMany(Salle::class, 'salle_matiere');
    }
  
    public function cours(){
        return $this->hasMany(Cours::class); 
    }

      //support
  public function supports() {
    return $this->hasMany(Supports::class);
}  
}
