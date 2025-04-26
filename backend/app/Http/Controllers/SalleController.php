<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salle;
use Illuminate\Support\Facades\Validator;

class SalleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(Salle::all());
       // return Salle::with('department')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
           // 'id' => 'required|string|unique:salles',
            'nom' => 'required|string|max:50|unique:salles',
            'batiment' => 'required|string|max:50',
            'type' => 'required|in:Amphithéâtre,Salle de cours,Laboratoire',
        
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $salle = Salle::create($request->all());
        return response()->json($salle, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $salle = Salle::findOrFail($id);
        return response()->json($salle);
    }

    public function update(Request $request, $id)
    {
        $salle = Salle::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|string|max:50',
            'batiment' => 'sometimes|string|max:50',
            'type' => 'sometimes|in:Amphithéâtre,Salle de cours,Laboratoire',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $salle->update($request->all());
        return response()->json($salle);
    }
    /**
     * Update the specified resource in storage.
     */
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        Salle::findOrFail($id)->delete();
        return response()->json(null, 204);
    
      //  $salle->delete();
        // return response()->noContent();
    }

    public function assignMatiere(Request $request, Salle $salle)
    {
        $request->validate([
            'matiere_id' => 'required|exists:matieres,id'
        ]);

        $salle->matieres()->syncWithoutDetaching([$request->matiere_id]);
        return $salle->load('matieres');
    }
}
