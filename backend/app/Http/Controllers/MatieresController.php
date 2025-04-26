<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Matieres;

use Illuminate\Support\Facades\Validator;

class MatieresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $matieres = Matieres::with('department')->get();
        return response()->json($matieres);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            // 'id' => 'required|string|unique:matieres',
             'intitule' => 'required|string|max:100',
             'code' => 'required|string|max:20|unique:matieres',
             'credits' => 'required|integer|min:1',
             'department_id' => 'required|exists:departments,id'
         ]);
     
         try {
             $matiere = Matieres::create([
              //   'id' => $validated['id'],
                 'intitule' => $validated['intitule'],
                 'code' => $validated['code'],
                 'credits' => (int)$validated['credits'],
                 'department_id' => $validated['department_id']
             ]);
             $matiere->load('department');
             return response()->json([  'success' => true,  'data' => $matiere   ], 201);
           
     
         } catch (\Exception $e) {
             return response()->json([
                 'success' => false,
                 'message' => 'Erreur lors de la création',
                 'error' => $e->getMessage()
             ], 500);
         }
    }

    /**
     * Display the specified resource.
     */
    public function show(Matieres $matieres)
    {
        //
        return response()->json($matieres->load('department'));
        // $matiere = Matiere::with('department')->findOrFail($id);
         //return response()->json($matiere);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $matiere = Matieres::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'intitule' => 'sometimes|string|max:100',
            'code' => 'sometimes|string|max:20|unique:matieres,code,'.$matiere->id,
            'credits' => 'sometimes|integer|min:1',
            'department_id' => 'sometimes|exists:departments,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
       
        $matiere->update($request->all());
        $matiere->load('department');
        return response()->json($matiere);
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        Matieres::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
