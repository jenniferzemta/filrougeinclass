import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  XMarkIcon,
  Bars3Icon,
  FunnelIcon
} from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const StageContent = () => {
  // États
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOffre, setCurrentOffre] = useState(null);
  const [actionType, setActionType] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    statut: "tous",
    type: "tous",
    domaine: "tous"
  });
  const [selectedTemplate, setSelectedTemplate] = useState("classique");

  // Modèles d'offres prédéfinis
  const templates = {
    classique: {
      backgroundColor: "#FFFFFF",
      textColor: "#000000",
      accentColor: "#0927EB",
      fontStyle: "sans-serif"
    },
    moderne: {
      backgroundColor: "#F8FAFC",
      textColor: "#1E293B",
      accentColor: "#FD6E47",
      fontStyle: "sans-serif"
    },
    elegant: {
      backgroundColor: "#FFFFFF",
      textColor: "#2D3748",
      accentColor: "#16A637",
      fontStyle: "serif"
    }
  };

  // Données mock (remplacer par votre appel API)
  useEffect(() => {
    const mockOffres = [
      {
        id: 1,
        titre: "Développeur Full Stack",
        entreprise: "TechCorp",
        logo: "/logos/techcorp.png",
        description: "Stage de 6 mois en développement web avec React et Node.js",
        domaine: "Informatique",
        type: "stage",
        dateDebut: "2023-09-01",
        dateFin: "2024-02-28",
        competences: ["React", "Node.js", "MongoDB"],
        avantages: ["Télétravail", "Tickets restaurant"],
        statut: "actif",
        contact: "rh@techcorp.com"
      },
      // ... autres offres mock
    ];
    setOffres(mockOffres);
    setFilteredOffres(mockOffres);
  }, []);

  // Filtrage des offres
  useEffect(() => {
    let result = offres;
    
    if (searchTerm) {
      result = result.filter(offre =>
        offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.entreprise.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.statut !== "tous") {
      result = result.filter(offre => offre.statut === filters.statut);
    }

    if (filters.type !== "tous") {
      result = result.filter(offre => offre.type === filters.type);
    }

    if (filters.domaine !== "tous") {
      result = result.filter(offre => offre.domaine === filters.domaine);
    }

    setFilteredOffres(result);
  }, [offres, searchTerm, filters]);

  // Gestion des actions
  const handleAdd = () => {
    setCurrentOffre({
      titre: "",
      entreprise: "",
      description: "",
      domaine: "",
      type: "stage",
      dateDebut: "",
      dateFin: "",
      competences: [],
      avantages: [],
      statut: "actif",
      contact: ""
    });
    setActionType("add");
    setIsModalOpen(true);
  };

  const handleEdit = (offre) => {
    setCurrentOffre({ ...offre });
    setActionType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setOffres(offres.filter(offre => offre.id !== id));
  };

  const toggleStatut = (id) => {
    setOffres(offres.map(offre =>
      offre.id === id 
        ? { ...offre, statut: offre.statut === "actif" ? "inactif" : "actif" }
        : offre
    ));
  };

  // Export PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR');
    
    // En-tête
    doc.setFontSize(18);
    doc.setTextColor(templates[selectedTemplate].accentColor);
    doc.text("Liste des offres de stage", 105, 15, null, null, 'center');
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Exporté le ${dateStr}`, 105, 22, null, null, 'center');
    
    // Données du tableau
    const data = filteredOffres.map(offre => [
      offre.titre,
      offre.entreprise,
      offre.type,
      offre.domaine,
      offre.statut === "actif" ? "Actif" : "Inactif",
      new Date(offre.dateDebut).toLocaleDateString('fr-FR'),
      new Date(offre.dateFin).toLocaleDateString('fr-FR')
    ]);
    
    // Tableau
    doc.autoTable({
      head: [['Titre', 'Entreprise', 'Type', 'Domaine', 'Statut', 'Début', 'Fin']],
      body: data,
      startY: 30,
      styles: {
        fontStyle: templates[selectedTemplate].fontStyle,
        textColor: templates[selectedTemplate].textColor,
      },
      headStyles: {
        fillColor: templates[selectedTemplate].accentColor,
        textColor: '#FFFFFF'
      }
    });
    
    doc.save(`offres-stages_${dateStr}.pdf`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* En-tête avec actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des offres de stage</h1>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nouvelle offre
          </button>
          
          <button
            onClick={exportToPDF}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Exporter PDF
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.statut}
              onChange={(e) => setFilters({...filters, statut: e.target.value})}
            >
              <option value="tous">Tous</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="tous">Tous</option>
              <option value="stage">Stage</option>
              <option value="formation">Formation</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domaine</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.domaine}
              onChange={(e) => setFilters({...filters, domaine: e.target.value})}
            >
              <option value="tous">Tous</option>
              <option value="Informatique">Informatique</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sélecteur de modèle */}
      <div className="mb-4 flex items-center">
        <span className="mr-3 text-sm font-medium text-gray-700">Modèle :</span>
        <div className="flex gap-2">
          {Object.keys(templates).map(template => (
            <button
              key={template}
              onClick={() => setSelectedTemplate(template)}
              className={`px-3 py-1 rounded-md text-sm capitalize ${
                selectedTemplate === template
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {template}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau des offres */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOffres.length > 0 ? (
              filteredOffres.map(offre => (
                <tr key={offre.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{offre.titre}</div>
                    <div className="text-sm text-gray-500">{offre.domaine}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {offre.logo && (
                        <img className="h-10 w-10 rounded-full mr-3" src={offre.logo} alt={offre.entreprise} />
                      )}
                      <div className="font-medium">{offre.entreprise}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      offre.type === "stage" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {offre.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(offre.dateDebut).toLocaleDateString('fr-FR')} - {new Date(offre.dateFin).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatut(offre.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        offre.statut === "actif"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {offre.statut === "actif" ? "Actif" : "Inactif"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(offre)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(offre.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Aucune offre trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal pour ajouter/modifier une offre */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold">
                {actionType === "add" ? "Ajouter une offre" : "Modifier une offre"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={currentOffre.titre}
                      onChange={(e) => setCurrentOffre({...currentOffre, titre: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={currentOffre.entreprise}
                      onChange={(e) => setCurrentOffre({...currentOffre, entreprise: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={currentOffre.type}
                      onChange={(e) => setCurrentOffre({...currentOffre, type: e.target.value})}
                    >
                      <option value="stage">Stage</option>
                      <option value="formation">Formation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domaine*</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={currentOffre.domaine}
                      onChange={(e) => setCurrentOffre({...currentOffre, domaine: e.target.value})}
                    >
                      <option value="">Sélectionner</option>
                      <option value="Informatique">Informatique</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de début*</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={currentOffre.dateDebut}
                      onChange={(e) => setCurrentOffre({...currentOffre, dateDebut: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin*</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={currentOffre.dateFin}
                      onChange={(e) => setCurrentOffre({...currentOffre, dateFin: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={currentOffre.description}
                      onChange={(e) => setCurrentOffre({...currentOffre, description: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact*</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={currentOffre.contact}
                      onChange={(e) => setCurrentOffre({...currentOffre, contact: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={currentOffre.statut}
                      onChange={(e) => setCurrentOffre({...currentOffre, statut: e.target.value})}
                    >
                      <option value="actif">Actif</option>
                      <option value="inactif">Inactif</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {actionType === "add" ? "Ajouter" : "Enregistrer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageContent;