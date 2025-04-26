<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cours', function (Blueprint $table) {
            $table->id();
            $table->string('salles_id');
            $table->string('matieres_id');
            $table->string('enseignant_id');
            $table->string('periodicite');
            $table->time('heure_deb');
            $table->time('heure_fin');
            $table->date('date');
            $table->string('status')->default('planifie');
            $table->timestamps();

            // $table->foreign('department_id')->references('id')->on('departments');
            $table->foreign('salles_id')->references('id')->on('salles');
            $table->foreign('matieres_id')->references('id')->on('matieres');
            $table->foreign('enseignant_id')->references('id')->on('enseignant');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cours');
    }
};
