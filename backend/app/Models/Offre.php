<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'titre',
        'image_path',
        'statut',
    ];

    protected $casts = [
        'statut' => 'string',
    ];

    public function scopeActive($query)
    {
        return $query->where('statut', 'actif');
    }

    // Scope pour les nouvelles offres
    public function scopeNewSince($query, $date)
    {
        return $query->where('published_at', '>', $date);
    }
}
