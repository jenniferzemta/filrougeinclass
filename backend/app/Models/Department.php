<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['id',
    'name'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
//matiers 
    public function matieres()
    {
        return $this->hasMany(Matiere::class);
    }
//salles
    public function salles()
    {
        return $this->hasMany(Salle::class);
    }
}