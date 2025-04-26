<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cours;
use Illuminate\Support\Facades\Validator;

class CoursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $cours = Cours::with(['salle', 'matiere', 'enseignant'])->get();
        return response()->json($cours);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'salles_id' => 'required|exists:salles,id',
            'matieres_id' => 'required|exists:matieres,id',
            'enseignant_id' => 'required|exists:users,id',
            'periodicite' => 'required',
            'heure_deb' => 'required',
            'heure_fin' => 'required|after:heure_deb',
            'date' => 'required|date',
            'status' => 'sometimes|in:planifié,Terminé,annulé',
          
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cours = Cours::create($validator->validated());

        return response()->json([
            'message' => 'Cours creé avec succès',
            'data' => $cours->load(['salle', 'matiere', 'enseignant'])
        ], 201);
    }


    

    /**
     * Display the specified resource.
     */
    public function show( Cours $cours)
    {
        //
        return response()->json($cours->load(['salle', 'matiere','enseignant']));
    

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, String $id)
    {

        $cours = Cours::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'salles_id' => 'sometimes|exists:salles,id',
            'matieres_id' => 'sometimes|exists:matieres,id',
            'enseignant_id' => 'sometimes|exists:users,id',
            'periodicite' => 'sometimes',
            'heure_deb' => 'sometimes',
            'heure_fin' => 'sometimes|after:heure_deb',
            'date' => 'sometimes|date',
            'status' => 'sometimes|in:planifié,Terminé,annulé',
          
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cours->update($validator->validated());

        return response()->json([
            'message' => 'Cours modifie avec succès',
            'data' => $cours->load(['salle', 'matiere', 'enseignant'])
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
       // $cours->delete();
       // return response()->json(['message' => 'Cour suprimé avec succès']);
       Cours::findOrFail($id)->delete();
       return response()->json(['message' => 'Cours supprime avec succes'], 204);
   
    }

}
