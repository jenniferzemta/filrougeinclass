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
        Schema::create('seances', function (Blueprint $table) {
            $table->id();
            $table->string('creneau_id');
            $table->string('salle_id');
            $table->string('matiere_id');
            $table->string('enseignant_id');
          //  $table->string('groupe_etudiants');
            $table->foreign('creneau_id')->references('id')->on('creneaux');
            $table->foreign('salle_id')->references('id')->on('salles');
            $table->foreign('matiere_id')->references('id')->on('matieres');
            $table->foreign('enseignant_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seances');
    }
};
