<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\CustomResetPassword;

class User extends Authenticatable
{
    /**  */
    use  HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        "nom",
        "prenom",
        'name',
        'email',
        'password',
        'role',
        'numero_badge',
        'matricule',
        'department_id'
    ];

    public function ra()
    {
        return $this->hasOne(Ra::class);
    }
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
  // app/Models/User.php
    public function etudiant()
    {
        return $this->hasOne(Etudiant::class, 'user_id');
    }
   
    // app/Models/User.php

    // Ajoutez la relation
   
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

     // app/Models/User.php
public function sendPasswordResetNotification($token)
{
    $this->notify(new CustomResetPassword($token));
}
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
