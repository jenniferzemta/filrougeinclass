"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/DashboardLayout"
import {
  DocumentTextIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ArrowLeftIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline"

export default function NouveauCoursPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    titre: "",
    code: "",
    description: "",
    departement: "",
    professeur: "",
    capacite: "",
    credits: "",
    heures: "",
    salle: "",
    jourSemaine: "",
    heureDebut: "",
    heureFin: "",
    dateDebut: "",
    dateFin: "",
    prerequis: "",
    objectifs: "",
    modalitesEvaluation: "",
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
    if (!formData.code.trim()) newErrors.code = "Le code est requis"
    if (!formData.departement.trim()) newErrors.departement = "Le département est requis"
    if (!formData.professeur.trim()) newErrors.professeur = "Le professeur est requis"
    if (!formData.credits.trim()) newErrors.credits = "Les crédits sont requis"
    if (!formData.heures.trim()) newErrors.heures = "Les heures sont requises"

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

      // Redirection vers la liste des cours
      router.push("/dashboard/responsable-admin?tab=cours")
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours:", error)
      setErrors({ submit: "Une erreur est survenue lors de l'ajout du cours" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const departements = [
    "Informatique",
    "Mathématiques",
    "Économie",
    "Droit",
    "Langues",
    "Sciences Humaines",
    "Physique",
    "Chimie",
    "Biologie",
  ]

  const professeurs = [
    "Dr. Robert Dupuis",
    "Prof. Claire Martin",
    "Dr. Philippe Lefevre",
    "Prof. Isabelle Moreau",
    "Dr. Jean Dubois",
    "Prof. Marie Lambert",
  ]

  const salles = ["Salle A101", "Salle B202", "Salle C303", "Amphithéâtre A", "Salle D404", "Laboratoire L1"]

  const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

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
            <h1 className="text-2xl font-semibold text-gray-900">Ajouter un nouveau cours</h1>
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

                {/* Titre et Code */}
                <div className="sm:col-span-4">
                  <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                    Titre du cours *
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
                    />
                  </div>
                  {errors.titre && <p className="mt-1 text-sm text-red-600">{errors.titre}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Code du cours *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      value={formData.code}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.code ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                      placeholder="ex: INFO101"
                    />
                  </div>
                  {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
                </div>

                {/* Description */}
                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description du cours
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Département et Professeur */}
                <div className="sm:col-span-3">
                  <label htmlFor="departement" className="block text-sm font-medium text-gray-700">
                    Département *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="departement"
                      name="departement"
                      value={formData.departement}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.departement ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    >
                      <option value="">Sélectionner un département</option>
                      {departements.map((departement) => (
                        <option key={departement} value={departement}>
                          {departement}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.departement && <p className="mt-1 text-sm text-red-600">{errors.departement}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="professeur" className="block text-sm font-medium text-gray-700">
                    Professeur *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserGroupIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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

                {/* Capacité, Crédits et Heures */}
                <div className="sm:col-span-2">
                  <label htmlFor="capacite" className="block text-sm font-medium text-gray-700">
                    Capacité
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserGroupIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="number"
                      name="capacite"
                      id="capacite"
                      min="1"
                      value={formData.capacite}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                      placeholder="ex: 30"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
                    Crédits ECTS *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="number"
                      name="credits"
                      id="credits"
                      min="1"
                      max="30"
                      value={formData.credits}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.credits ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                      placeholder="ex: 6"
                    />
                  </div>
                  {errors.credits && <p className="mt-1 text-sm text-red-600">{errors.credits}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="heures" className="block text-sm font-medium text-gray-700">
                    Heures totales *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="number"
                      name="heures"
                      id="heures"
                      min="1"
                      value={formData.heures}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.heures ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                      placeholder="ex: 36"
                    />
                  </div>
                  {errors.heures && <p className="mt-1 text-sm text-red-600">{errors.heures}</p>}
                </div>

                {/* Horaires */}
                <div className="sm:col-span-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mt-4">Horaires et lieu</h2>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="salle" className="block text-sm font-medium text-gray-700">
                    Salle
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
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    >
                      <option value="">Sélectionner une salle</option>
                      {salles.map((salle) => (
                        <option key={salle} value={salle}>
                          {salle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="jourSemaine" className="block text-sm font-medium text-gray-700">
                    Jour de la semaine
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
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    >
                      <option value="">Sélectionner un jour</option>
                      {joursSemaine.map((jour) => (
                        <option key={jour} value={jour}>
                          {jour}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="heureDebut" className="block text-sm font-medium text-gray-700">
                    Heure de début
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
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="heureFin" className="block text-sm font-medium text-gray-700">
                    Heure de fin
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
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

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

                {/* Contenu pédagogique */}
                <div className="sm:col-span-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mt-4">Contenu pédagogique</h2>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="prerequis" className="block text-sm font-medium text-gray-700">
                    Prérequis
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="prerequis"
                      name="prerequis"
                      rows={2}
                      value={formData.prerequis}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Connaissances préalables nécessaires pour suivre ce cours"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="objectifs" className="block text-sm font-medium text-gray-700">
                    Objectifs d'apprentissage
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="objectifs"
                      name="objectifs"
                      rows={3}
                      value={formData.objectifs}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Compétences et connaissances que les étudiants acquerront"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="modalitesEvaluation" className="block text-sm font-medium text-gray-700">
                    Modalités d'évaluation
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="modalitesEvaluation"
                      name="modalitesEvaluation"
                      rows={2}
                      value={formData.modalitesEvaluation}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Ex: Contrôle continu (40%), Examen final (60%)"
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
                      <option value="inactif">Inactif</option>
                      <option value="complet">Complet</option>
                      <option value="annule">Annulé</option>
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
