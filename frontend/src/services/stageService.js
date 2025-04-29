// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const API_URL = "http://localhost:8000/api/offres";

// export default {
//   themeColors: {
//     primary: "#0927EB",
//     secondary: "#FD6E47",
//     success: "#16A637",
//     dark: "#1E293B",
//     light: "#F8FAFC"
//   },

//   async getAll() {
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) throw new Error('Erreur réseau');
//       const data = await response.json();
//       return data.map(offre => ({
//         ...offre,
//         competences_requises: offre.competences_requises ? JSON.parse(offre.competences_requises) : [],
//         avantages: offre.avantages ? JSON.parse(offre.avantages) : []
//       }));
//     } catch (error) {
//       console.error("Erreur lors de la récupération des offres:", error);
//       throw error;
//     }
//   },

//   async create(offreData) {
//     try {
//       const formData = new FormData();
      
//       // Champs obligatoires
//       formData.append('titre', offreData.titre);
//       formData.append('description', offreData.description);
//       formData.append('entreprise', offreData.entreprise);
//       formData.append('localisation', offreData.localisation);
//       formData.append('domaine', offreData.domaine);
//       formData.append('date_debut', offreData.date_debut);
//       formData.append('date_fin', offreData.date_fin);
//       formData.append('type', offreData.type);
//       formData.append('contact_email', offreData.contact_email);
//       formData.append('statut', offreData.statut || 'actif');

//       // Champs optionnels
//       if (offreData.logo_entreprise) {
//         formData.append('logo_entreprise', offreData.logo_entreprise);
//       }
      
//       if (offreData.contact_telephone) {
//         formData.append('contact_telephone', offreData.contact_telephone);
//       }

//       // Tableaux convertis en JSON
//       if (offreData.competences_requises && offreData.competences_requises.length > 0) {
//         formData.append('competences_requises', JSON.stringify(offreData.competences_requises));
//       }

//       if (offreData.avantages && offreData.avantages.length > 0) {
//         formData.append('avantages', JSON.stringify(offreData.avantages));
//       }

//       // Debug
//       for (let [key, value] of formData.entries()) {
//         console.log(key, value);
//       }

//       const response = await fetch(API_URL, {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Erreur détaillée:', errorData);
//         throw new Error(errorData.message || 'Validation failed');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("Erreur création offre:", error);
//       throw error;
//     }
//   },

//   async update(id, offreData) {
//     try {
//       const formData = new FormData();
      
//       Object.keys(offreData).forEach(key => {
//         if (key === 'competences_requises' || key === 'avantages') {
//           formData.append(key, JSON.stringify(offreData[key]));
//         } else if (key === 'logo_entreprise' && offreData[key] instanceof File) {
//           formData.append('logo_entreprise', offreData[key]);
//         } else if (offreData[key] !== null && offreData[key] !== undefined) {
//           formData.append(key, offreData[key]);
//         }
//       });

//       const response = await fetch(`${API_URL}/${id}`, {
//         method: 'PUT',
//         body: formData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Update failed');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("Erreur mise à jour offre:", error);
//       throw error;
//     }
//   },

//   async delete(id) {
//     try {
//       const response = await fetch(`${API_URL}/${id}`, {
//         method: 'DELETE'
//       });

//       if (!response.ok) {
//         throw new Error('Delete failed');
//       }
//     } catch (error) {
//       console.error("Erreur suppression offre:", error);
//       throw error;
//     }
//   },

//   async toggleStatus(id) {
//     try {
//       const response = await fetch(`${API_URL}/${id}/toggle-statut`, {
//         method: 'PATCH'
//       });

//       if (!response.ok) {
//         throw new Error('Toggle status failed');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("Erreur changement statut:", error);
//       throw error;
//     }
//   },

//   generateCVPreview(offre) {
//     const doc = new jsPDF();
//     const { primary, secondary, dark } = this.themeColors;

//     // En-tête stylisé
//     doc.setFillColor(...this.hexToRgb(primary));
//     doc.rect(0, 0, 210, 40, 'F');
    
//     // Logo entreprise
//     if (offre.logo_entreprise) {
//       const img = new Image();
//       img.src = `/storage/${offre.logo_entreprise}`;
//       doc.addImage(img, 'JPEG', 15, 15, 30, 30);
//     }

//     // Titre
//     doc.setFontSize(22);
//     doc.setTextColor(255, 255, 255);
//     doc.text(offre.titre, 60, 25);
    
//     // Sous-titre
//     doc.setFontSize(14);
//     doc.text(`Chez ${offre.entreprise} | ${offre.domaine}`, 60, 35);

//     // Section Détails
//     doc.setFontSize(12);
//     doc.setTextColor(...this.hexToRgb(dark));
//     doc.text("Détails de l'offre", 15, 55);
//     doc.line(15, 58, 60, 58);

//     const details = [
//       `Localisation: ${offre.localisation}`,
//       `Type: ${offre.type === 'stage' ? 'Stage' : 'Formation'}`,
//       `Période: Du ${new Date(offre.date_debut).toLocaleDateString('fr-FR')} au ${new Date(offre.date_fin).toLocaleDateString('fr-FR')}`,
//       `Statut: ${offre.statut === 'actif' ? 'Actif' : 'Inactif'}`
//     ];

//     details.forEach((item, i) => doc.text(item, 20, 70 + (i * 7)));

//     // Section Description
//     doc.text("Description", 15, 105);
//     doc.line(15, 108, 45, 108);
//     doc.text(offre.description, 20, 115, { maxWidth: 170 });

//     // Compétences
//     doc.text("Compétences requises", 15, 145);
//     doc.line(15, 148, 65, 148);
//     offre.competences_requises.forEach((comp, i) => 
//       doc.text(`• ${comp}`, 20, 155 + (i * 7), { maxWidth: 170 })
//     );

//     // Avantages
//     doc.text("Avantages", 15, 175);
//     doc.line(15, 178, 35, 178);
//     offre.avantages.forEach((av, i) => 
//       doc.text(`• ${av}`, 20, 185 + (i * 7), { maxWidth: 170 })
//     );

//     // Contact
//     doc.setTextColor(...this.hexToRgb(secondary));
//     doc.text("Contact", 15, 210);
//     doc.line(15, 213, 30, 213);
//     doc.text(`Email: ${offre.contact_email}`, 20, 220);
//     if (offre.contact_telephone) {
//       doc.text(`Tél: ${offre.contact_telephone}`, 20, 227);
//     }

//     return doc.output('datauristring');
//   },

//   hexToRgb(hex) {
//     const r = parseInt(hex.slice(1, 3), 16);
//     const g = parseInt(hex.slice(3, 5), 16);
//     const b = parseInt(hex.slice(5, 7), 16);
//     return [r, g, b];
//   }
// };



import axios from 'axios';

const API_URL = 'http://localhost:8000/api/offre';

export default {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  create: async (offerData) => {
    const formData = new FormData();
    formData.append('titre', offerData.titre);
    formData.append('image', offerData.image);

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  update: async (id, offerData) => {
    const formData = new FormData();
    formData.append('titre', offerData.titre);
    formData.append('_method', 'PUT');
    
    if (offerData.image) {
      formData.append('image', offerData.image);
    }
    if (offerData.statut) {
      formData.append('statut', offerData.statut);
    }

    const response = await axios.post(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },

  toggleStatus: async (id) => {
    const response = await axios.patch(`${API_URL}/${id}/toggle-statut`);
    return response.data;
  }
};