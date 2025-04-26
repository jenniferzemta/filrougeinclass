<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rs extends Model
{
    //
    protected $table = 'rs';
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
