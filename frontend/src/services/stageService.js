import { jsPDF } from "jspdf";
import "jspdf-autotable";

const API_URL = "http://localhost:8000/api/offres";

class stageService {
  static async getAllOffres() {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des offres");
    }
    return await response.json();
  }

  static async createOffre(offreData) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offreData),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la création de l'offre");
    }
    return await response.json();
  }

  static async updateOffre(id, offreData) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offreData),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de l'offre");
    }
    return await response.json();
  }

  static async deleteOffre(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'offre");
    }
  }

  static async toggleStatut(id) {
    const response = await fetch(`${API_URL}/${id}/toggle-statut`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Erreur lors du changement de statut");
    }
    return await response.json();
  }

  static async exportToPDF(offres) {
    const doc = new jsPDF();
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR');
    
    // En-tête
    doc.setFontSize(18);
    doc.setTextColor('#0927EB');
    doc.text("Liste des offres de stage", 105, 15, null, null, 'center');
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Exporté le ${dateStr}`, 105, 22, null, null, 'center');
    
    // Données du tableau
    const data = offres.map(offre => [
      offre.titre,
      offre.entreprise,
      offre.type === "stage" ? "Stage" : "Formation",
      offre.statut === "actif" ? "Actif" : "Inactif",
      new Date(offre.dateDebut).toLocaleDateString('fr-FR'),
      new Date(offre.dateFin).toLocaleDateString('fr-FR')
    ]);
    
    // Tableau
    doc.autoTable({
      head: [['Titre', 'Entreprise', 'Type', 'Statut', 'Début', 'Fin']],
      body: data,
      startY: 30,
      headStyles: {
        fillColor: '#0927EB',
        textColor: '#FFFFFF'
      }
    });
    
    doc.save(`offres-stages_${dateStr}.pdf`);
  }
}

export default stageService;