<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Enseignant extends Model
{
    //
    use HasFactory, HasApiTokens,Notifiable;

    protected $table = 'enseignant';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'specialite',
        'statut',
    ];

    /**
     * Get the user that owns the Enseignant role.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }

    /**
     * Get the matieres for the enseignant.
     */
    public function matieres()
    {
        return $this->belongsToMany(Matieres::class, 'enseignant_matiere', 'enseignant_id', 'matiere_id');
    }
}
