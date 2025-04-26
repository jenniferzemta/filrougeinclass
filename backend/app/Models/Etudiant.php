<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Etudiant extends Model
{
    //
    use HasApiTokens,HasFactory,Notifiable;
    protected $table = 'etudiant';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'matricule',
        'niveau',
    ];

    /**
     * Get the user that owns the Etudiant role.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }
}
