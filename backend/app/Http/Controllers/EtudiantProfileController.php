<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EtudiantProfileController extends Controller
{
    /**
     * Récupère le profil complet de l'étudiant connecté
     */
    public function show()
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json(['error' => 'Utilisateur non trouvé'], 404);
            }

            // Charge les relations etudiant et department
            $user->load('etudiant', 'department');

            return response()->json([
                'success' => true,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'matricule' => $user->matricule,
                    'role' => $user->role,
                    'department' => $user->department,
                ],
                'etudiant' => $user->etudiant ? [
                    // 'date_naissance' => $user->etudiant->date_naissance,
                    'telephone' => $user->etudiant->telephone,
                    'filiere' => $user->etudiant->filiere,
                    'niveau_etude' => $user->etudiant->niveau_etude,
                    'photo' => $user->etudiant->photo ? asset('storage/'.$user->etudiant->photo) : null,
                    'adresse' => $user->etudiant->adresse,
                ] : null
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération du profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Met à jour le profil de l'étudiant connecté
     */public function update(Request $request)
{
    try {
        $user = Auth::user();

        // Validation commune
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,'.$user->id,
            'matricule' => 'sometimes|string|unique:users,matricule,'.$user->id,
            'telephone' => 'required|string|max:20',
            'filiere' => 'required|string|max:100',
            'niveau_etude' => 'required|string|in:Licence 1,Licence 2,Licence 3,Master 1,Master 2',
            'adresse' => 'sometimes|string|max:255',
            'photo' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Mise à jour utilisateur
        $user->update($request->only(['name', 'email', 'matricule']));

        // Mise à jour étudiant
        $etudiantData = $request->only(['telephone', 'filiere', 'niveau_etude', 'adresse']);

        if ($request->hasFile('photo')) {
            if ($user->etudiant && $user->etudiant->photo) {
                Storage::delete($user->etudiant->photo);
            }
            $etudiantData['photo'] = $request->file('photo')->store('profile', 'public');
        }

        if ($user->etudiant) {
            $user->etudiant->update($etudiantData);
        } else {
            $user->etudiant()->create($etudiantData);
        }

        return response()->json([
            'success' => true,
            'message' => 'Profil mis à jour avec succès',
            'user' => $user->load('department'),
            'etudiant' => $user->etudiant
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la mise à jour',
            'error' => $e->getMessage()
        ], 500);
    }
}
    /**
     * Change le mot de passe de l'étudiant
     */
    public function changePassword(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'current_password' => 'required|string',
                'new_password' => 'required|string|min:8|different:current_password',
                'confirm_password' => 'required|string|same:new_password'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = Auth::user();
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'errors' => ['current_password' => ['Le mot de passe actuel est incorrect']]
                ], 422);
            }

            $user->password = Hash::make($request->new_password);
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Mot de passe mis à jour avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du changement de mot de passe',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}