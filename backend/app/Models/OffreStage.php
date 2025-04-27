<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffreStage extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'titre',
        'description',
        'entreprise',
        'logo_entreprise',
        'localisation',
        'domaine',
        'date_debut',
        'date_fin',
        'type',
        'competences_requises',
        'avantages',
        'contact_email',
        'contact_telephone',
        'statut',
        'user_id'
    ];

    protected $casts = [
        'competences_requises' => 'array',
        'avantages' => 'array',
        'date_debut' => 'date',
        'date_fin' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
