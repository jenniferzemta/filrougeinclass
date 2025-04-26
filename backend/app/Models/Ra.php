<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Ra extends Model
{
    //
    use HasApiTokens,HasFactory,Notifiable;
    protected $table = 'ra';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'numero_badge',
    ];

    /**
     * Get the user that owns the Etudiant role.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }
}
