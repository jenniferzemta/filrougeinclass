<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('offre_stages', function (Blueprint $table) {
            $table->id();
            $table->string('titre', 100);
            $table->string('entreprise', 100);
            $table->text('description');
            $table->text('competences');
            $table->date('date_publication')->default(DB::raw('CURRENT_DATE'));
            $table->enum('statut', ['actif', 'passif'])->default('actif');
            $table->string('rs_id'); // Responsable de stage
    
            $table->foreign('rs_id')->references('id')->on('users')->onDelete('cascade');
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
