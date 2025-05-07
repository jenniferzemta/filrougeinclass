<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Cours;
use App\Models\Matieres;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuthController extends Controller
{
  // app/Http/Controllers/AuthController.php
public function register(Request $request)
{
    // Déterminer les règles de validation en fonction du rôle
    $rules = [
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'role' => 'required|in:ra,rs,Etudiant,Enseignant,Admin',
        'department_id' => 'required|exists:departments,id'
    ];

 // Règles conditionnelles
 if ($request->role === 'ra' || $request->role === 'rs') {
    $rules['numero_badge'] = 'required|string|unique:users,numero_badge';
} else 
if  ($request->role === 'Etudiant' || $request->role === 'Enseignant'){
    $rules['matricule'] = 'required|string|unique:users,matricule';
}

$validatedData = $request->validate($rules);

$userData = [
    'name' => $validatedData['nom'] . ' ' . $validatedData['prenom'],
    'email' => $validatedData['email'],
    'password' => Hash::make($validatedData['password']),
    'role' => $validatedData['role'],
    'department_id' => $validatedData['department_id'],
    'matricule' => $validatedData['matricule'] ?? null,
    'numero_badge' => $validatedData['numero_badge'] ?? null
];

$user = User::create($userData);

    return response()->json([
        'message' => 'Utilisateur créé avec succès',
        'user' => $user,
        'department' => $user->department,
      
    ], 201);
}

 public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion reussie',
            'user' => $user,
            'token'=> $token,
            'department' => $user->department,
          
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    
    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
            'department' => $request->user()->department
        ]);
    }

// statistiques 

public function getStats()
{
    $stats = [
        'etudiants' => User::where('role', 'Etudiant')->count(),
        'enseignants' => User::where('role', 'Enseignant')->count(),
        'ra' => User::where('role', 'ra')->count(),
        'rs' => User::where('role', 'rs')->count(),
        'departments' => Department::count(),
        'courses' => Cours::count(),
        'matieres'=> Matieres::count(),
    ];

    return response()->json($stats);
}

public function getUsers(Request $request)
{
    $users = User::with('department')
        ->when($request->role, fn($q, $role) => $q->where('role', $role))
        ->paginate(10);

    return response()->json($users);
}

public function deleteUser(User $user)
{
    $user->delete();
    return response()->json(['message' => 'Utilisateur supprimé']);
}

// Récupérer les utilisateurs par rôle
public function getUsersByRole($role)
{
    $validRoles = ['ra', 'rs', 'Enseignant', 'Etudiant'];
    
    if (!in_array($role, $validRoles)) {
        return response()->json(['error' => 'Rôle invalide'], 400);
    }

    $users = User::with('department')
                ->where('role', $role)
                ->paginate(10);

    return response()->json($users);
}

// Mettre à jour un utilisateur
public function updateUser(Request $request, $id)
{
    try {
        $user = User::findOrFail($id);
        
        // Le reste de votre logique existante...
        if ($user->role === 'Admin' && !$request->user()->isAdmin()) {
            return response()->json(['error' => 'Action non autorisée'], 403);
        }
        $validated = $request->validate([
            'role' => 'sometimes|in:ra,rs,Etudiant,Enseignant,Admin',
            'department_id' => 'sometimes|exists:departments,id',
           
           
        ]);
    
        $validated['role'] ;
        $validated['department_id'] ;
    
        $user->update($validated);
    
        return response()->json([
            'message' => 'Utilisateur mis à jour avec succès',
            'user' => $user->fresh()
        ]);
        // Validation et mise à jour...

    } catch (ModelNotFoundException $e) {
        return response()->json([
            'error' => 'Utilisateur non trouvé'
        ], 404);
    }
}


  

}