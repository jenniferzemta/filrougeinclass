"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/DashboardLayout"
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  CalendarIcon,
  MapPinIcon,
  IdentificationIcon,
  ArrowLeftIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline"

export default function NouveauProfesseurPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    adresse: "",
    codePostal: "",
    ville: "",
    pays: "France",
    departement: "",
    specialite: "",
    dateEmbauche: "",
    numeroEmploye: "",
    statut: "actif",
    grade: "",
    bureauNumero: "",
    heuresEnseignement: "",
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

    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis"
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis"

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
    }

    if (!formData.departement.trim()) newErrors.departement = "Le département est requis"
    if (!formData.specialite.trim()) newErrors.specialite = "La spécialité est requise"

    if (!formData.numeroEmploye.trim()) {
      newErrors.numeroEmploye = "Le numéro d'employé est requis"
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

      // Redirection vers la liste des professeurs
      router.push("/dashboard/responsable-admin?tab=professeurs")
    } catch (error) {
      console.error("Erreur lors de l'ajout du professeur:", error)
      setErrors({ submit: "Une erreur est survenue lors de l'ajout du professeur" })
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

  const grades = [
    "Professeur des universités",
    "Maître de conférences",
    "Professeur agrégé",
    "Professeur certifié",
    "Attaché temporaire d'enseignement et de recherche (ATER)",
    "Doctorant contractuel",
    "Vacataire",
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
            <h1 className="text-2xl font-semibold text-gray-900">Ajouter un nouveau professeur</h1>
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
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Informations personnelles</h2>
                </div>

                {/* Prénom et Nom */}
                <div className="sm:col-span-3">
                  <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                    Prénom *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="prenom"
                      id="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.prenom ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    />
                  </div>
                  {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                    Nom *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.nom ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    />
                  </div>
                  {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
                </div>

                {/* Email et Téléphone */}
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="tel"
                      name="telephone"
                      id="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

                {/* Date de naissance */}
                <div className="sm:col-span-3">
                  <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">
                    Date de naissance
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="date"
                      name="dateNaissance"
                      id="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

                {/* Adresse */}
                <div className="sm:col-span-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mt-4">Adresse</h2>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                    Adresse
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="adresse"
                      id="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="codePostal" className="block text-sm font-medium text-gray-700">
                    Code postal
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="codePostal"
                      id="codePostal"
                      value={formData.codePostal}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
                    Ville
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="ville"
                      id="ville"
                      value={formData.ville}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="pays" className="block text-sm font-medium text-gray-700">
                    Pays
                  </label>
                  <div className="mt-1">
                    <select
                      id="pays"
                      name="pays"
                      value={formData.pays}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Canada">Canada</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>

                {/* Informations professionnelles */}
                <div className="sm:col-span-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mt-4">
                    Informations professionnelles
                  </h2>
                </div>

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
                  <label htmlFor="specialite" className="block text-sm font-medium text-gray-700">
                    Spécialité *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BriefcaseIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="specialite"
                      id="specialite"
                      value={formData.specialite}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.specialite ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    />
                  </div>
                  {errors.specialite && <p className="mt-1 text-sm text-red-600">{errors.specialite}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                    Grade
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    >
                      <option value="">Sélectionner un grade</option>
                      {grades.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="dateEmbauche" className="block text-sm font-medium text-gray-700">
                    Date d'embauche
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="date"
                      name="dateEmbauche"
                      id="dateEmbauche"
                      value={formData.dateEmbauche}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="numeroEmploye" className="block text-sm font-medium text-gray-700">
                    Numéro d'employé *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IdentificationIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="numeroEmploye"
                      id="numeroEmploye"
                      value={formData.numeroEmploye}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.numeroEmploye ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    />
                  </div>
                  {errors.numeroEmploye && <p className="mt-1 text-sm text-red-600">{errors.numeroEmploye}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="bureauNumero" className="block text-sm font-medium text-gray-700">
                    Numéro de bureau
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="bureauNumero"
                      id="bureauNumero"
                      value={formData.bureauNumero}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="heuresEnseignement" className="block text-sm font-medium text-gray-700">
                    Heures d'enseignement
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="heuresEnseignement"
                      id="heuresEnseignement"
                      value={formData.heuresEnseignement}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
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
                      <option value="conge">En congé</option>
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
