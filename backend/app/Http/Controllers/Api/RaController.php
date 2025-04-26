<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\{Department, Salle, Matiere, Seance,Creneau};
use Illuminate\Http\Request;

class RaController extends Controller
{

    // Gestion des départements
    public function getDepartements()
    {
        return Department::withCount(['matieres', 'users'])->get();
    }
    
    // Gestion des salles
    public function getSalles()
    {
        return Salle::withCount('seances')->get();
    }
    
    public function createSalle(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string',
            'batiment' => 'required|string',
            'type' => 'required|in:Amphithéâtre,Salle de cours,Laboratoire',
            'capacite' => 'required|integer'
        ]);
        
        return Salle::create($data);
    }
    
    // Gestion des matières
    public function getMatieres()
    {
        return Matiere::with('departement')->get();
    }
    
    // Génération emploi du temps
    public function generateEmploiTemps(Request $request)
    {
        $data = $request->validate([
            'departement_id' => 'required|exists:departements,id',
            'semestre' => 'required|string'
        ]);
        
        // Logique de génération
        $matieres = Matiere::where('departement_id', $data['departement_id'])->get();
        $salles = Salle::all();
        $creneaux = Creneau::all();
        
        $seances = [];
        foreach ($matieres as $matiere) {
            $seances[] = Seance::create([
                'creneau_id' => $creneaux->random()->id,
                'salle_id' => $salles->random()->id,
                'matiere_id' => $matiere->id,
                'enseignant_id' => $matiere->departement->users->random()->id,
                'groupe_etudiants' => 'Groupe ' . rand(1, 5)
            ]);
        }
        
        return response()->json($seances);
    }

}
