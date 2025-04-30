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
                    'date_naissance' => $user->etudiant->date_naissance,
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
     */
    public function update(Request $request)
    {
        try {
            $user = Auth::user();

            // Validation des données
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,'.$user->id,
                'matricule' => 'sometimes|string|unique:users,matricule,'.$user->id,
                'current_password' => 'required_with:new_password',
                'new_password' => 'sometimes|min:8|different:current_password',
                'confirm_password' => 'same:new_password',
                'date_naissance' => 'sometimes|date',
                'telephone' => 'sometimes|string|max:20',
                'filiere' => 'sometimes|string|max:100',
                'niveau_etude' => 'sometimes|string|max:50',
                'adresse' => 'sometimes|string|max:255',
                'photo' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            // Mise à jour des informations de base
            $userData = $request->only(['name', 'email', 'matricule']);
            if (!empty($userData)) {
                $user->update($userData);
            }

            // Mise à jour du mot de passe si fourni
            if ($request->filled('current_password') && $request->filled('new_password')) {
                if (!Hash::check($request->current_password, $user->password)) {
                    return response()->json([
                        'success' => false,
                        'errors' => ['current_password' => ['Le mot de passe actuel est incorrect']]
                    ], 422);
                }
                $user->password = Hash::make($request->new_password);
                $user->save();
            }

            // Mise à jour des informations étudiant
            $etudiantData = $request->except(['name', 'email', 'matricule', 'photo', 'current_password', 'new_password', 'confirm_password']);
            
            // Gestion de la photo
            if ($request->hasFile('photo')) {
                // Supprimer l'ancienne photo si elle existe
                if ($user->etudiant && $user->etudiant->photo) {
                    Storage::delete($user->etudiant->photo);
                }
                $etudiantData['photo'] = $request->file('photo')->store('profiles', 'public');
            }

            // Création ou mise à jour du profil étudiant
            if ($user->etudiant) {
                $user->etudiant->update($etudiantData);
            } else {
                $user->etudiant()->create($etudiantData);
            }

            // Recharger les relations pour la réponse
            $user->load('etudiant', 'department');

            return response()->json([
                'success' => true,
                'message' => 'Profil mis à jour avec succès',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'matricule' => $user->matricule,
                    'department' => $user->department,
                ],
                'etudiant' => $user->etudiant ? [
                    'date_naissance' => $user->etudiant->date_naissance,
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
                'message' => 'Erreur lors de la mise à jour du profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}