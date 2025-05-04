<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Salle extends Model
{
    //
    protected $fillable = [
    'id',
    'nom',
    'batiment',
    'type',
   


];

public function department()
{
    return $this->belongsTo(Department::class);
}

public function seances() {
    return $this->hasMany(Seance::class);
}

public function matieres()
    {
        return $this->belongsToMany(Matieres::class, 'salle_matiere');
    }

    public function cours()
    {
        return $this->hasMany(Cours::class);
    }
// public function matieres()
// {
//     return $this->belongsToMany(Matiere::class, 'salle_matiere');
// }


}
