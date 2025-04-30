<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Offre;

class EtudiantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Offre::active()->with('domaine');
        
        if ($request->has('last_checked')) {
            $query->newSince($request->last_checked);
        }
        
        return $query->get();
    }

    // Télécharger l'image
    public function downloadImage($id)
    {
        $offre = Offre::findOrFail($id);
        $path = storage_path('app/public/' . $offre->image_path);
        
        if (!file_exists($path)) {
            abort(404);
        }

        return response()->download($path);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

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
