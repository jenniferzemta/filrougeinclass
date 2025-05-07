<?php 
// app/Http/Controllers/RaProfileController.php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Ra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class RaProfileController extends Controller
{
    /**
     * Récupère le profil complet du RA connecté
     */
    public function show()
    {
        try {
            $user = Auth::user();
        
            $user->load('ra', 'department');

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'matricule' => $user->matricule,
                        'department' => $user->department,
                    ],
                'profile' => $user->ra ? [
                    'telephone' => $user->ra->telephone,
                    'specialite' => $user->ra->specialite,
                    'grade' => $user->ra->grade,
                    'photo' => $user->ra->photo ? asset('storage/'.$user->ra->photo) : null,
                    'adresse' => $user->ra->adresse,
                    'date_naissance' => $user->ra->date_naissance,
                   // 'responsabilites' => $user->ra->responsabilites,
                    'bureau' => $user->ra->bureau,
                    ] : null
                    ]
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
     * Met à jour le profil du RA connecté
     */
    /**
 * Met à jour le profil du RA connecté
 */
public function update(Request $request)
{
    $validated = $request->validate([
        'name' => 'sometimes|string|max:255',
        'email' => 'sometimes|email',
        'numero_badge' => 'sometimes|string',
        'telephone' => 'nullable|string',
        'specialite' => 'nullable|string',
        'grade' => 'nullable|string',
        'adresse' => 'nullable|string',
        'date_naissance' => 'nullable|date',
        'bureau' => 'nullable|string',
        'photo' => 'nullable|string|max:2048',
    ]);

    // Mise à jour du user
    $user = auth()->user();
    // $user->update([
    //     'name' => $validated['name'],
    //     'email' => $validated['email'],
    //     'numero_badge' => $validated['numero_badge'],
    // ]);

    $user->update($request->only(['name', 'email', 'numero_badge']));

    // Mise à jour du profil RA
    $profile = $user->ra; // relation hasOne()
    $profile->update($validated);

    // Gérer la photo
    if ($request->hasFile('photo')) {
        $photoPath = $request->file('photo')->store('responsables', 'public');
        $profile->photo = $photoPath;
        $profile->save();
    }

    return response()->json(['data' => ['user' => $user, 'profile' => $profile]]);
}

// public function update(Request $request)
// {
//     try {
//         $user = Auth::user();
//         $user->load('ra', 'department');
    
//         $validator = Validator::make($request->all(), [
//             'name' => 'sometimes|string|max:255',
//             'email' => 'sometimes|email|unique:users,email,'.$user->id,
//             'numero_badge' => 'sometimes|string|unique:users,numero_badge,'.$user->id,
//             'telephone' => 'required|string|max:20',
//             'specialite' => 'required|string|max:100',
//             'grade' => 'sometimes|string|max:100',
//             'adresse' => 'sometimes|string|max:255',
//             'date_naissance' => 'sometimes|date|before_or_equal:today',
//             'bureau' => 'sometimes|string|max:50',
//             'photo' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048'
//         ]);

//         if ($validator->fails()) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'Validation error',
//                 'errors' => $validator->errors()
//             ], 422);
//         }

//         // Mise à jour des données utilisateur
//         $user->update($request->only(['name', 'email', 'numero_badge']));

//         // Préparation des données du profil
//         $profileData = $request->only(['telephone', 'specialite', 'grade', 'adresse', 'date_naissance','bureau' ]);

//         // Gestion de la photo
//         if ($request->hasFile('photo')) {
//             // Supprimer l'ancienne photo si elle existe
//             if ($user->ra && $user->ra->photo) {
//                 Storage::disk('public')->delete($user->ra->photo);
//             }
            
//             // Stocker la nouvelle photo
//             $path = $request->file('photo')->store('responsables', 'public');
//             $profileData['photo'] = $path;
//         }

//         // Mise à jour ou création du profil RA
//         if ($user->ra) {
//             $user->ra->update($profileData);
//         } else {
//             $profileData['user_id'] = $user->id;
//             Ra::create($profileData);
//         }

//         // Charger les relations fraîchement mises à jour
//         $user->refresh()->load('ra', 'department');

//         return response()->json([
//             'success' => true,
//             'message' => 'Profil mis à jour avec succès',
//             'data' => [
//                 'user' => $user->only('id', 'name', 'email', 'numero_badge'),
//                 'profile' => $user->ra
//             ]
//         ]);

//     } catch (\Exception $e) {
//         return response()->json([
//             'success' => false,
//             'message' => 'Erreur lors de la mise à jour du profil',
//             'error' => $e->getMessage()
//         ], 500);
//     }
// }
    /**
     * Change le mot de passe du RA
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