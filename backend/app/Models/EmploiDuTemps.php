<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmploiDuTemps extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'title',
        'start',
        'end',
        'cours_id',
        'metadata'
    ];

    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
        'metadata' => 'array'
    ];

    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }

    
}
