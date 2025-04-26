<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

      return response()->json(Department::all());
    //  return Department::withCount(['users', 'matieres', 'salles'])->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:departments',
        ]);

        $department = Department::create($validated);

        return response()->json($department, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show( Department $department)
    {
        //
      //  return response()->json($department);
      return $department->load(['users', 'matieres', 'salles']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $department->update($validated);

        return response()->json($department, 203);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        //
        $department->delete();
        return response()->json(['message' => 'Cours supprime avec succes'],204);
    }
}
