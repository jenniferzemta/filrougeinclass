<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;

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
        'role' => 'required|in:ra,rs,Etudiant,Enseignant',
        'department_id' => 'required|exists:departments,id'
    ];

    // // Ajouter les règles conditionnelles
    // if (in_array($request->role, ['ra', 'rs'])) {
    //     $rules['numeroBadge'] = 'required|string|unique:users,numero_badge';
    // } elseif ($request->role === 'Enseignant') {
    //     $rules['matriculeEnseignant'] = 'required|string|unique:users,matricule';
    // } elseif ($request->role === 'Etudiant') {
    //     $rules['matriculeEtudiant'] = 'required|string|unique:users,matricule';
    // }

    // $validatedData = $request->validate($rules);

    // // Préparer les données pour la création de l'utilisateur
    // $userData = [
    //     'name' => $validatedData['name'],
    //     'email' => $validatedData['email'],
    //     'password' => Hash::make($validatedData['password']),
    //     'role' => $validatedData['role'],
    //     'department_id' => $request->department_id,
    // ];

    // // Ajouter les champs spécifiques au rôle
    // if (in_array($validatedData['role'], ['ra', 'rs'])) {
    //     $userData['numero_badge'] = $validatedData['numeroBadge'];
    // } else {
    //     $userData['matricule'] = $validatedData['role'] === 'Enseignant' 
    //         ? $validatedData['matriculeEnseignant'] 
    //         : $validatedData['matriculeEtudiant'];
    // }

    // // Création de l'utilisateur
    // $user = User::create($userData);
 // Règles conditionnelles
 if ($request->role === 'ra' || $request->role === 'rs') {
    $rules['numero_badge'] = 'required|string|unique:users,numero_badge';
} else {
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





public function sendResetLink(Request $request)
{
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    return $status === Password::RESET_LINK_SENT
        ? response()->json(['message' => __($status)])
        : response()->json(['error' => __($status)], 400);
}

public function resetPassword(Request $request)
{
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
        }
    );

    return $status === Password::PASSWORD_RESET
        ? response()->json(['message' => __($status)])
        : response()->json(['error' => __($status)], 400);
}


    public function verifyEmail(Request $request)
{
    if (!hash_equals((string) $request->route('id'), (string) $request->user()->getKey())) {
        return response()->json(['message' => 'URL invalide'], 403);
    }

    if (!hash_equals((string) $request->route('hash'), sha1($request->user()->getEmailForVerification()))) {
        return response()->json(['message' => 'URL invalide'], 403);
    }

    if ($request->user()->hasVerifiedEmail()) {
        return response()->json(['message' => 'Email déjà vérifié']);
    }

    $request->user()->markEmailAsVerified();

    return response()->json(['message' => 'Email vérifié avec succès']);
}

public function resendVerification(Request $request)
{
    if ($request->user()->hasVerifiedEmail()) {
        return response()->json(['message' => 'Email déjà vérifié']);
    }

    $request->user()->sendEmailVerificationNotification();

    return response()->json(['message' => 'Lien de vérification envoyé']);
}
}