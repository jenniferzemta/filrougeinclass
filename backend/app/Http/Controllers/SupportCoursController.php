<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supports;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SupportCoursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
      // Récupère tous les supports sans filtre utilisateur
    $supports = Supports::with('matieres')->get();
    
    return response()->json($supports);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {$validator = Validator::make($request->all(), [
        'title' => 'required|string|max:255',
        'fichier' => 'required|file|mimes:pdf,docx,pptx,zip,excel',
        'matiere_id' => 'required|exists:matieres,id'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    $filePath = $request->file('fichier')->store('supports', 'public');

    $support = Supports::create([
        'title' => $request->titre,
        'file_path' => $filePath,
        'matiere_id' => $request->matiere_id,
       
    ]);

    return response()->json($support, 201);
}

public function show($id)
{
    $support = Supports::findOrFail($id);
    return response()->json($support);
}


    /**
     * Display the specified resource.
     */
   
    /**
     * Update the specified resource in storage.
        */
    public function update(Request $request, $id)
    {
        $support = Supports::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'fichier' => 'sometimes|file|mimes:pdf,docx,pptx,zip,excel',
            'matiere_id' => 'sometimes|exists:matieres,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('fichier')) {
            Storage::disk('public')->delete($support->file_path);
            $filePath = $request->file('fichier')->store('supports_cours', 'public');
            $support->file_path = $filePath;
        }

        $support->update($request->except('fichier'));
        return response()->json($support);
    }

    

    // Supprimer un support

    public function destroy($id)
    {
        $support = Supports::findOrFail($id);
        Storage::disk('public')->delete($support->file_path);
        $support->delete();
        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
        */
    public function download($id)
    {
        $support = Supports::findOrFail($id);
        $path = storage_path('app/public/' . $support->file_path);
        
        if (!file_exists($path)) {
            return response()->json(['error' => 'Fichier introuvable'], 404);
        }

        return response()->download($path);
    }

    
    
}
