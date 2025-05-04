<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offre_stage extends Model
{
    //

    use HasFactory;
  protected $fillable = [
    'titre',
    'entreprise',
    'description',
    'competences',
    'date_publication',
    'statut',
    'rs_id'

  ];
    
}
