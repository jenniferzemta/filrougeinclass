<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supports;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SupportCoursController extends Controller
{
    public function index()
    {
        $supports = Supports::with(['matieres','user'])->get();
        return response()->json($supports);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,ppt,pptx,txt,xls,xlsx|max:5120',
            'matiere_id' => 'required|exists:matieres,id',
            'user_id' => 'exists:users,id'
        ]);

        // Stockage du fichier
        $filePath = $request->file('file')->store('supports', 'public');

        $support = Supports::create([
            'title' => $validated['title'],
             'file_path' => $filePath,
           // 'file_path'=> $validated['file'],
            'matiere_id' => $validated['matiere_id'], // Correction du nom de champ
            // 'user_id' => $validated['user_id'] ?? null // Gestion de la valeur nullable
        ]);

        return response()->json($support, 201);
    }

    public function show($id)
    {
        $support = Supports::with(['matiere', 'user'])->findOrFail($id);
        return response()->json($support);
    }

    public function update(Request $request, $id)
    {
        $support = Supports::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'file' => 'sometimes|mimes:pdf|max:5120',
            'matiere_id' => 'sometimes|exists:matieres,id',
            'user_id' => 'sometimes|exists:users,id'
        ]);

        if ($request->hasFile('file')) {
            // Supprimer l'ancien fichier
            Storage::disk('public')->delete($support->file_path);
            
            $filePath = $request->file('file')->store('supports', 'public');
            $validated['file_path'] = $filePath;
        }

        $support->update($validated);
        return response()->json($support);
    }

    public function destroy($id)
    {
        $support = Supports::findOrFail($id);

        if ($support->file_path) {
            Storage::disk('public')->delete($support->file_path);
        }

        $support->delete();
        return response()->json(null, 204);
    }

    public function downloadFile($id)
    {
        $support = Supports::findOrFail($id);
        $path = storage_path('app/public/' . $support->file_path);
        
        if (!file_exists($path)) {
            abort(404);
        }

        return response()->download($path);
    }
}