"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/DashboardLayout"
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline"

export default function NouvelEmploiDuTempsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    titre: "",
    cours: "",
    professeur: "",
    groupe: "",
    salle: "",
    jourSemaine: "",
    heureDebut: "",
    heureFin: "",
    dateDebut: "",
    dateFin: "",
    recurrence: "hebdomadaire",
    description: "",
    couleur: "#0927EB",
    statut: "actif",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.titre.trim()) newErrors.titre = "Le titre est requis"
    if (!formData.cours.trim()) newErrors.cours = "Le cours est requis"
    if (!formData.professeur.trim()) newErrors.professeur = "Le professeur est requis"
    if (!formData.salle.trim()) newErrors.salle = "La salle est requise"
    if (!formData.jourSemaine.trim()) newErrors.jourSemaine = "Le jour est requis"
    if (!formData.heureDebut.trim()) newErrors.heureDebut = "L'heure de début est requise"
    if (!formData.heureFin.trim()) newErrors.heureFin = "L'heure de fin est requise"

    // Vérifier que l'heure de fin est après l'heure de début
    if (formData.heureDebut && formData.heureFin && formData.heureDebut >= formData.heureFin) {
      newErrors.heureFin = "L'heure de fin doit être après l'heure de début"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Simulation d'une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirection vers la page de l'emploi du temps
      router.push("/dashboard/responsable-admin/emploi-du-temps")
    } catch (error) {
      console.error("Erreur lors de l'ajout du créneau:", error)
      setErrors({ submit: "Une erreur est survenue lors de l'ajout du créneau" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const cours = [
    "Introduction à la programmation (INFO101)",
    "Bases de données avancées (INFO305)",
    "Marketing digital (MKT201)",
    "Finance d'entreprise (FIN301)",
    "Anglais professionnel (LAN202)",
    "Mathématiques discrètes (MAT104)",
  ]

  const professeurs = [
    "Dr. Robert Dupuis",
    "Prof. Claire Martin",
    "Dr. Philippe Lefevre",
    "Prof. Isabelle Moreau",
    "Dr. Jean Dubois",
    "Prof. Marie Lambert",
  ]

  const groupes = [
    "L1 Informatique - Groupe A",
    "L1 Informatique - Groupe B",
    "L2 Marketing - Groupe unique",
    "L3 Finance - Groupe unique",
    "M1 Informatique - Groupe A",
    "M1 Informatique - Groupe B",
    "M2 Ressources Humaines - Groupe unique",
  ]

  const salles = ["Salle A101", "Salle B202", "Salle C303", "Amphithéâtre A", "Salle D404", "Laboratoire L1"]

  const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

  const recurrences = [
    { value: "unique", label: "Séance unique" },
    { value: "hebdomadaire", label: "Hebdomadaire" },
    { value: "bi-hebdomadaire", label: "Bi-hebdomadaire" },
    { value: "mensuel", label: "Mensuel" },
  ]

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center mb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Ajouter un créneau à l'emploi du temps</h1>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <form onSubmit={handleSubmit} className="p-6">
              {errors.submit && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Informations générales</h2>
                </div>

                {/* Titre */}
                <div className="sm:col-span-6">
                  <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                    Titre du créneau *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="titre"
                      id="titre"
                      value={formData.titre}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.titre ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                      placeholder="ex: Cours de programmation - L1 Info"
                    />
                  </div>
                  {errors.titre && <p className="mt-1 text-sm text-red-600">{errors.titre}</p>}
                </div>

                {/* Cours et Professeur */}
                <div className="sm:col-span-3">
                  <label htmlFor="cours" className="block text-sm font-medium text-gray-700">
                    Cours *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="cours"
                      name="cours"
                      value={formData.cours}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.cours ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    >
                      <option value="">Sélectionner un cours</option>
                      {cours.map((cours) => (
                        <option key={cours} value={cours}>
                          {cours}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.cours && <p className="mt-1 text-sm text-red-600">{errors.cours}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="professeur" className="block text-sm font-medium text-gray-700">
                    Professeur *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="professeur"
                      name="professeur"
                      value={formData.professeur}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.professeur ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    >
                      <option value="">Sélectionner un professeur</option>
                      {professeurs.map((professeur) => (
                        <option key={professeur} value={professeur}>
                          {professeur}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.professeur && <p className="mt-1 text-sm text-red-600">{errors.professeur}</p>}
                </div>

                {/* Groupe et Salle */}
                <div className="sm:col-span-3">
                  <label htmlFor="groupe" className="block text-sm font-medium text-gray-700">
                    Groupe d'étudiants
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserGroupIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="groupe"
                      name="groupe"
                      value={formData.groupe}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    >
                      <option value="">Sélectionner un groupe</option>
                      {groupes.map((groupe) => (
                        <option key={groupe} value={groupe}>
                          {groupe}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="salle" className="block text-sm font-medium text-gray-700">
                    Salle *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="salle"
                      name="salle"
                      value={formData.salle}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.salle ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    >
                      <option value="">Sélectionner une salle</option>
                      {salles.map((salle) => (
                        <option key={salle} value={salle}>
                          {salle}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.salle && <p className="mt-1 text-sm text-red-600">{errors.salle}</p>}
                </div>

                {/* Horaires */}
                <div className="sm:col-span-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mt-4">Horaires</h2>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="jourSemaine" className="block text-sm font-medium text-gray-700">
                    Jour de la semaine *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="jourSemaine"
                      name="jourSemaine"
                      value={formData.jourSemaine}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.jourSemaine ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    >
                      <option value="">Sélectionner un jour</option>
                      {joursSemaine.map((jour) => (
                        <option key={jour} value={jour}>
                          {jour}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.jourSemaine && <p className="mt-1 text-sm text-red-600">{errors.jourSemaine}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="heureDebut" className="block text-sm font-medium text-gray-700">
                    Heure de début *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="time"
                      name="heureDebut"
                      id="heureDebut"
                      value={formData.heureDebut}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.heureDebut ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    />
                  </div>
                  {errors.heureDebut && <p className="mt-1 text-sm text-red-600">{errors.heureDebut}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="heureFin" className="block text-sm font-medium text-gray-700">
                    Heure de fin *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="time"
                      name="heureFin"
                      id="heureFin"
                      value={formData.heureFin}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.heureFin ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    />
                  </div>
                  {errors.heureFin && <p className="mt-1 text-sm text-red-600">{errors.heureFin}</p>}
                </div>

                {/* Dates et récurrence */}
                <div className="sm:col-span-3">
                  <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                    Date de début
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="date"
                      name="dateDebut"
                      id="dateDebut"
                      value={formData.dateDebut}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
                    Date de fin
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="date"
                      name="dateFin"
                      id="dateFin"
                      value={formData.dateFin}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="recurrence" className="block text-sm font-medium text-gray-700">
                    Récurrence
                  </label>
                  <div className="mt-1">
                    <select
                      id="recurrence"
                      name="recurrence"
                      value={formData.recurrence}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    >
                      {recurrences.map((recurrence) => (
                        <option key={recurrence.value} value={recurrence.value}>
                          {recurrence.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="couleur" className="block text-sm font-medium text-gray-700">
                    Couleur
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      name="couleur"
                      id="couleur"
                      value={formData.couleur}
                      onChange={handleChange}
                      className="h-8 w-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0927EB] focus:border-[#0927EB]"
                    />
                    <span className="ml-2 text-sm text-gray-500">Couleur d'affichage dans le calendrier</span>
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Informations complémentaires sur ce créneau"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="statut" className="block text-sm font-medium text-gray-700">
                    Statut
                  </label>
                  <div className="mt-1">
                    <select
                      id="statut"
                      name="statut"
                      value={formData.statut}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    >
                      <option value="actif">Actif</option>
                      <option value="annule">Annulé</option>
                      <option value="reporte">Reporté</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
