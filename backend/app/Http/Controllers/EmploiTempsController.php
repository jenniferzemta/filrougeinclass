<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use App\Models\EmploiDuTemps;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmploiTempsController extends Controller
 {

    public function index()
    {
        $emplois = EmploiDuTemps::with(['cours.matiere', 'cours.enseignant', 'cours.salle'])->get();
        return response()->json($emplois);
    }

    // Créer un nouvel emploi du temps
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'start' => 'required|date',
            'end' => 'required|date|after:start',
            'cours_id' => 'required|exists:cours,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $emploi = EmploiDuTemps::create($validator->validated());

        return response()->json($emploi, 201);
    }

    // Mettre à jour un emploi du temps
    public function update(Request $request, $id)
    {
        $emploi = EmploiDuTemps::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'start' => 'sometimes|date',
            'end' => 'sometimes|date|after:start',
            'cours_id' => 'sometimes|exists:cours,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $emploi->update($validator->validated());

        return response()->json($emploi);
    }

    // Supprimer un emploi du temps
    public function destroy($id)
    {
        EmploiDuTemps::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    // Récupérer tous les cours
    public function courses()
    {
        $courses = Cours::with(['matiere', 'enseignant', 'salle'])->get();
        return response()->json($courses);
    }
//     /**
//      * Display a listing of the resource.
//      */
//     public function index()
//     {
//         //
//         $schedules = EmploiDuTemps::with('cours')->get();
//         return response()->json($schedules);
//     }

//     /**
//      * Store a newly created resource in storage.
//      */
//     public function store(Request $request)
//     {
//         //
//         $validator = Validator::make($request->all(), [
//             'title' => 'required|string|max:255',
//             'start' => 'required|date',
//             'end' => 'required|date|after:start',
//             'cours_id' => 'required|exists:cours,id',
//             'metadata' => 'nullable|array'
//         ]);

//         if ($validator->fails()) {
//             return response()->json($validator->errors(), 422);
//         }

//         $schedule = EmploiDuTemps::create($validator->validated());

//         return response()->json($schedule, 201);
//     }

//     /**
//      * Display the specified resource.
//      */
//     public function show(EmploiDuTemps $schedule)
//     {
//         //
//         return response()->json($schedule->load(['cours']));
    
//     }

//     /**
//      * Update the specified resource in storage.
//      */
//     public function update(Request $request, string $id)
//     {
//         //
//         $schedule = EmploiDuTemps::findOrFail($id);

//         $validator = Validator::make($request->all(), [
//             'title' => 'sometimes|string|max:255',
//             'start' => 'sometimes|date',
//             'end' => 'sometimes|date|after:start',
//             'metadata' => 'nullable|array'
//         ]);

//         if ($validator->fails()) {
//             return response()->json($validator->errors(), 422);
//         }

//         $schedule->update($validator->validated());

//         return response()->json($schedule);
//     }

//     /**
//      * Remove the specified resource from storage.
//      */
//     public function destroy(string $id)
//     {
//         //
//         EmploiDuTemps::findOrFail($id)->delete();
//         return response()->json(['message' => 'suppression reussie'],204);
//     }

//     public function courses()
//     {
//         $cours = Cours::with(['salle', 'matiere', 'enseignant'])->get();
//         return response()->json($cours);
//     }
}
