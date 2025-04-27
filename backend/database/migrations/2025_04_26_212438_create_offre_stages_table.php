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
        Schema::create('offre_stages', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description');
            $table->string('entreprise');
            $table->string('logo_entreprise')->nullable();
            $table->string('localisation');
            $table->string('domaine');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->string('type')->default('stage'); // stage ou formation
            $table->json('competences_requises')->nullable();
            $table->json('avantages')->nullable();
            $table->string('contact_email');
            $table->string('contact_telephone')->nullable();
            $table->enum('statut', ['actif', 'inactif'])->default('actif');
        //    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_stages');
    }
};
