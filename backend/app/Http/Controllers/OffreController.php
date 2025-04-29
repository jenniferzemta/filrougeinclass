<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Offre;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class OffreController extends Controller
{
    public function index()
    {
        $offres = Offre::all();
        return response()->json($offres);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = $request->file('image')->store('offres_images', 'public');
        $offre = Offre::create([
            'titre' => $validated['titre'],
            'image_path' => $imagePath,
            'statut' => 'actif' // Valeur par défaut
        ]);

        return response()->json($offre, 201);
    }
 //SHOW

    public function show($id)
    {
        $offre = Offre::findOrFail($id);
        return response()->json($offre);
    }

    public function update(Request $request, $id)
    {
        $offre = Offre::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'statut' => 'sometimes|in:actif,inactif',
        ]);

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image
            Storage::disk('public')->delete($offre->image_path);
            
            $imagePath = $request->file('image')->store('offres_images', 'public');
            $validated['image_path'] = $imagePath;
        }

        $offre->update($validated);
        return response()->json($offre);
    }

    public function destroy($id)
    {
        $offre = Offre::findOrFail($id);

        if ($offre->image_path) {
            Storage::disk('public')->delete($offre->image_path);
        }

        $offre->delete();
        return response()->json(null, 204);
    }

    public function toggleStatut($id)
    {
        $offre = Offre::findOrFail($id);
        $offre->statut = $offre->statut === 'actif' ? 'inactif' : 'actif';
        $offre->save();
        
        return response()->json($offre);
    }
}