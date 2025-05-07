<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class EtudiantProfileController extends Controller
{
    public function show($id)
    {
        try {
            // Récupération de l'utilisateur avec vérification du rôle étudiant
            $user = User::with('etudiant')
                      ->where('id', $id)
                      ->where('role', 'Etudiant') // Notez la minuscule pour la cohérence
                      ->first();
    
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Étudiant non trouvé'
                ], 404);
            }
    
            // Vérification que l'étudiant existe
            if (!$user->etudiant) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Profil étudiant non trouvé'
                ], 404);
            }
    
            // Formatage de la réponse
            $response = [
                'id' => $user->id,
               
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'etudiant' => [
                    'telephone' => $user->etudiant->telephone ?? null,
                    'filiere' => $user->etudiant->filiere ?? null,
                    'adresse' => $user->etudiant->adresse ?? null,
                    'date_naissance' => $user->etudiant->date_naissance ?? null,
                ],
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at
            ];
    
            return response()->json([
                'status' => 'success',
                'data' => $response
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur serveur'
            ], 500);
        }
    }
    /**
     * Met à jour les informations d'un étudiant
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id){
        // Validation des données
        $validator = Validator::make($request->all(), [
            
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,'.$id,
            'telephone' => 'sometimes|string|max:20',
            'filiere' => 'sometimes|string|max:20',
            'adresse' => 'sometimes|string|max:255',
            'date_naissance' => 'sometimes|date',
            // Ajoutez ici les autres règles de validation pour les champs étudiant
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Récupération de l'utilisateur étudiant
        $user = User::where('id', $id)
                  ->where('role', 'etudiant')
                  ->firstOrFail();

        // Mise à jour des données utilisateur
        $userData = $request->only(['name', 'email','matricule']);
        if (!empty($userData)) {
            $user->update($userData);
        }

        // Mise à jour des données étudiant
        $etudiant = Etudiant::where('user_id', $id)->firstOrFail();
        $etudiantData = $request->except(['name', 'email']);
        if (!empty($etudiantData)) {
            $etudiant->update($etudiantData);
        }

        // Rafraîchir les modèles pour obtenir les dernières données
        $user->refresh();
        $etudiant->refresh();

        return response()->json([
            'status' => 'success',
            'message' => 'Étudiant mis à jour avec succès',
            'data' => [
                'user' => $user,
                'etudiant' => $etudiant
            ]
        ]);
    }

    //  * Récupère le profil complet de l'étudiant connecté
     
    // public function show()
    // {
    //     try {
    //         $user = Auth::user();
        
    //         $user->load('etudiant', 'department');

    //         return response()->json([
    //             'success' => true,
    //             'data' => [
    //                 'user' => [
    //                     'id' => $user->id,
    //                     'name' => $user->name,
    //                     'email' => $user->email,
    //                     'matricule' => $user->matricule,
    //                     'department' => $user->department,
    //                 ],
    //                 'profile' => $user->etudiant ? [
    //                     'telephone' => $user->etudiant->telephone,
    //                     'filiere' => $user->etudiant->filiere,
    //                     'niveau_etude' => $user->etudiant->niveau_etude,
    //                     'photo' => $user->etudiant->photo ? Storage::url($user->etudiant->photo) : null,
    //                     'adresse' => $user->etudiant->adresse,
    //                 ] : null
    //             ]
    //         ]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Erreur lors de la récupération du profil',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }


    // /**
    //  * Met à jour le profil de l'étudiant connecté
    //  */
    // public function update(Request $request)
    // {
    //      try {
    //         $user = Auth::user();

    //         if (!$user || $user->role !== 'Etudiant') {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Accès réservé aux étudiants'
    //             ], 403);
    //         }

    //         $validator = Validator::make($request->all(), [
    //             'name' => 'sometimes|string|max:255',
    //             'email' => 'sometimes|email|unique:users,email,'.$user->id,
    //             'matricule' => 'sometimes|string|unique:users,matricule,'.$user->id,
    //             'telephone' => 'sometimes|string|max:20',
    //             'filiere' => 'sometimes|string|max:100',
    //             'niveau_etude' => 'sometimes|string',
    //             'adresse' => 'sometimes|string|max:255',
    //             'photo' => 'sometimes|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
    //         ]);

    //         if ($validator->fails()) {
    //             return response()->json([
    //                 'success' => false,
    //                 'errors' => $validator->errors()
    //             ], 422);
    //         }
            
    //         // Mise à jour utilisateur
    //         $user->name = $request->input('name', $user->name);
    //         $user->email = $request->input('email', $user->email);
    //         $user->save();

    //         // profile
    //         $profileData = $request->only(['telephone', 'filiere', 'niveau_etude', 'adresse']);
            
    //         if ($request->hasFile('photo')) {
    //             // Supprimer l'ancienne photo si elle existe
    //             if ($user->etudiant && $user->etudiant->photo) {
    //                 Storage::disk('public')->delete($user->etudiant->photo);
    //             }
                
    //             $profileData['photo'] = $request->file('photo')->store('etudiants', 'public');
    //         }

    //         // Mise à jour ou création du profil
    //         if ($user->etudiant) {
    //             $user->etudiant()->update($profileData);
    //         } else {
    //             Etudiant::create($profileData);
    //             $user->etudiant()->create($profileData);
    //         }


    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Profil mis à jour avec succès',
    //             'data' => $user->fresh(['etudiant', 'department'])
    //         ]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Erreur lors de la mise à jour',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    // /**
    //  * Change le mot de passe de l'étudiant
    //  */
    // public function changePassword(Request $request)
    // {
    //     try {
    //         $validator = Validator::make($request->all(), [
    //             'current_password' => 'required|string',
    //             'new_password' => 'required|string|min:8|different:current_password',
    //             'confirm_password' => 'required|string|same:new_password'
    //         ]);

    //         if ($validator->fails()) {
    //             return response()->json([
    //                 'success' => false,
    //                 'errors' => $validator->errors()
    //             ], 422);
    //         }

    //         $user = Auth::user();
    //         if (!Hash::check($request->current_password, $user->password)) {
    //             return response()->json([
    //                 'success' => false,
    //                 'errors' => ['current_password' => ['Le mot de passe actuel est incorrect']]
    //             ], 422);
    //         }

    //         $user->password = Hash::make($request->new_password);
    //         $user->save();

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Mot de passe mis à jour avec succès'
    //         ]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Erreur lors du changement de mot de passe',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }
}  