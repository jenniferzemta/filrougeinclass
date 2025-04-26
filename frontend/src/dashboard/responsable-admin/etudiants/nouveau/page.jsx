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
} from "@heroicons/react/24/outline"

export default function NouvelEtudiantPage() {
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
    formation: "",
    niveau: "",
    anneeEntree: new Date().getFullYear(),
    numeroEtudiant: "",
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

    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis"
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis"

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
    }

    if (!formData.formation.trim()) newErrors.formation = "La formation est requise"
    if (!formData.niveau.trim()) newErrors.niveau = "Le niveau est requis"

    if (!formData.numeroEtudiant.trim()) {
      newErrors.numeroEtudiant = "Le numéro étudiant est requis"
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

      // Redirection vers la liste des étudiants
      router.push("/dashboard/responsable-admin?tab=etudiants")
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant:", error)
      setErrors({ submit: "Une erreur est survenue lors de l'ajout de l'étudiant" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formations = [
    "Licence Informatique",
    "Licence Mathématiques",
    "Licence Économie",
    "Licence Droit",
    "Master Informatique",
    "Master Finance",
    "Master Marketing",
    "Master Ressources Humaines",
  ]

  const niveaux = ["L1", "L2", "L3", "M1", "M2", "Doctorat"]

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
            <h1 className="text-2xl font-semibold text-gray-900">Ajouter un nouvel étudiant</h1>
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

                {/* Informations académiques */}
                <div className="sm:col-span-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mt-4">Informations académiques</h2>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="formation" className="block text-sm font-medium text-gray-700">
                    Formation *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="formation"
                      name="formation"
                      value={formData.formation}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.formation ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    >
                      <option value="">Sélectionner une formation</option>
                      {formations.map((formation) => (
                        <option key={formation} value={formation}>
                          {formation}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.formation && <p className="mt-1 text-sm text-red-600">{errors.formation}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="niveau" className="block text-sm font-medium text-gray-700">
                    Niveau *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="niveau"
                      name="niveau"
                      value={formData.niveau}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.niveau ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    >
                      <option value="">Sélectionner un niveau</option>
                      {niveaux.map((niveau) => (
                        <option key={niveau} value={niveau}>
                          {niveau}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.niveau && <p className="mt-1 text-sm text-red-600">{errors.niveau}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="anneeEntree" className="block text-sm font-medium text-gray-700">
                    Année d'entrée
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="anneeEntree"
                      name="anneeEntree"
                      value={formData.anneeEntree}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    >
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="numeroEtudiant" className="block text-sm font-medium text-gray-700">
                    Numéro étudiant *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IdentificationIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="numeroEtudiant"
                      id="numeroEtudiant"
                      value={formData.numeroEtudiant}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.numeroEtudiant ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    />
                  </div>
                  {errors.numeroEtudiant && <p className="mt-1 text-sm text-red-600">{errors.numeroEtudiant}</p>}
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
                      <option value="suspendu">Suspendu</option>
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
