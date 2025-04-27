<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OffreStage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
class OffreStageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $offres = OffreStage::all();
        return response()->json($offres);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'entreprise' => 'required|string|max:255',
            'logo_entreprise' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'localisation' => 'required|string',
            'domaine' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'type' => 'required|in:stage,formation',
            'competences_requises' => 'nullable|array',
            'avantages' => 'nullable|array',
            'contact_email' => 'required|email',
            'contact_telephone' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('logo_entreprise')) {
            $data['logo_entreprise'] = $request->file('logo_entreprise')->store('logos', 'public');
        }

       
        $data['competences_requises'] = json_encode($data['competences_requises'] ?? []);
        $data['avantages'] = json_encode($data['avantages'] ?? []);

        $offre = OffreStage::create($data);

        return response()->json($offre, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $offre = OffreStage::findOrFail($id);
        return response()->json($offre);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $offre = OffreStage::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'entreprise' => 'sometimes|string|max:255',
            'logo_entreprise' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'localisation' => 'sometimes|string',
            'domaine' => 'sometimes|string',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'sometimes|date|after:date_debut',
            'type' => 'sometimes|in:stage,formation',
            'competences_requises' => 'nullable|array',
            'avantages' => 'nullable|array',
            'contact_email' => 'sometimes|email',
            'contact_telephone' => 'nullable|string',
            'statut' => 'sometimes|in:actif,inactif',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('logo_entreprise')) {
            // Supprimer l'ancien logo si existe
            if ($offre->logo_entreprise) {
                Storage::disk('public')->delete($offre->logo_entreprise);
            }
            $data['logo_entreprise'] = $request->file('logo_entreprise')->store('logos', 'public');
        }

        if (isset($data['competences_requises'])) {
            $data['competences_requises'] = json_encode($data['competences_requises']);
        }

        if (isset($data['avantages'])) {
            $data['avantages'] = json_encode($data['avantages']);
        }

        $offre->update($data);

        return response()->json($offre);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $offre = OffreStage::findOrFail($id);
        
        if ($offre->logo_entreprise) {
            Storage::disk('public')->delete($offre->logo_entreprise);
        }
        
        $offre->delete();
        
        return response()->json(['message' => 'Offre supprimée avec succès'], 204);
    }

    // public function mesOffres()
    // {
    //     $offres = auth()->user()->offresStages()->latest()->get();
    //     return response()->json($offres);
    // }

    public function toggleStatut($id)
    {
        $offre = OffreStage::findOrFail($id);
        $offre->statut = $offre->statut === 'actif' ? 'inactif' : 'actif';
        $offre->save();
        
        return response()->json($offre);
    }
}
