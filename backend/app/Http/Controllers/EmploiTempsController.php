<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use App\Models\EmploiDuTemps;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmploiTempsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $schedules = EmploiDuTemps::with('cours')->get();
        return response()->json($schedules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'start' => 'required|date',
            'end' => 'required|date|after:start',
            'cours_id' => 'required|exists:cours,id',
            'metadata' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $schedule = EmploiDuTemps::create($validator->validated());

        return response()->json($schedule, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $schedule = EmploiDuTemps::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'start' => 'sometimes|date',
            'end' => 'sometimes|date|after:start',
            'metadata' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $schedule->update($validator->validated());

        return response()->json($schedule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        EmploiDuTemps::findOrFail($id)->delete();
        return response()->json(['message' => 'suppression reussie'],204);
    }

    public function cours()
    {
        $courses = Cours::with(['matiere', 'salle', 'enseignant'])->get();
        return response()->json($courses);
    }
}
