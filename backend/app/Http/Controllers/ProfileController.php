<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    //

    public function updateProfile(Request $request)
{
    $user = $request->user();
    
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
        'department_id' => 'required|string|max:255',
    ]);

    $user->update($request->only('name', 'email', 'department_id'));

    return response()->json(['message' => 'Profil mis à jour avec succès']);
}

public function updatePassword(Request $request)
{
    $request->validate([
        'current_password' => 'required|string',
        'password' => 'required|string|confirmed|min:8',
    ]);

    $user = $request->user();

    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json(['message' => 'Mot de passe actuel incorrect'], 422);
    }

    $user->update([
        'password' => Hash::make($request->password)
    ]);

    return response()->json(['message' => 'Mot de passe mis à jour avec succès']);
}
}
