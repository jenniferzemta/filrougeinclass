"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/DashboardLayout"
import { BuildingOfficeIcon, UserGroupIcon, ArrowLeftIcon, MapPinIcon } from "@heroicons/react/24/outline"

export default function NouvelleSallePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nom: "",
    batiment: "",
    etage: "",
    numero: "",
    capacite: "",
    type: "cours",
    equipements: [],
    description: "",
    statut: "disponible",
    accessibilite: false,
    superficie: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const handleEquipementChange = (e) => {
    const { value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      equipements: checked ? [...prev.equipements, value] : prev.equipements.filter((equip) => equip !== value),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis"
    if (!formData.batiment.trim()) newErrors.batiment = "Le bâtiment est requis"
    if (!formData.capacite.trim()) newErrors.capacite = "La capacité est requise"

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

      // Redirection vers la liste des salles
      router.push("/dashboard/responsable-admin?tab=salles")
    } catch (error) {
      console.error("Erreur lors de l'ajout de la salle:", error)
      setErrors({ submit: "Une erreur est survenue lors de l'ajout de la salle" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const batiments = ["Bâtiment A", "Bâtiment B", "Bâtiment C", "Bâtiment D", "Amphithéâtre"]
  const etages = ["Sous-sol", "Rez-de-chaussée", "1er étage", "2ème étage", "3ème étage", "4ème étage"]
  const typesSalle = ["cours", "laboratoire", "informatique", "réunion", "amphithéâtre", "autre"]
  const equipementsList = [
    "Projecteur",
    "Tableau blanc",
    "Tableau noir",
    "Ordinateurs",
    "Système audio",
    "Microphones",
    "Visioconférence",
    "Wifi",
    "Climatisation",
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
            <h1 className="text-2xl font-semibold text-gray-900">Ajouter une nouvelle salle</h1>
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

                {/* Nom et Bâtiment */}
                <div className="sm:col-span-3">
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                    Nom de la salle *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                      placeholder="ex: Salle A101"
                    />
                  </div>
                  {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="batiment" className="block text-sm font-medium text-gray-700">
                    Bâtiment *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="batiment"
                      name="batiment"
                      value={formData.batiment}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.batiment ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                    >
                      <option value="">Sélectionner un bâtiment</option>
                      {batiments.map((batiment) => (
                        <option key={batiment} value={batiment}>
                          {batiment}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.batiment && <p className="mt-1 text-sm text-red-600">{errors.batiment}</p>}
                </div>

                {/* Étage et Numéro */}
                <div className="sm:col-span-3">
                  <label htmlFor="etage" className="block text-sm font-medium text-gray-700">
                    Étage
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="etage"
                      name="etage"
                      value={formData.etage}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    >
                      <option value="">Sélectionner un étage</option>
                      {etages.map((etage) => (
                        <option key={etage} value={etage}>
                          {etage}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                    Numéro
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="numero"
                      id="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                      placeholder="ex: 101"
                    />
                  </div>
                </div>

                {/* Capacité et Type */}
                <div className="sm:col-span-3">
                  <label htmlFor="capacite" className="block text-sm font-medium text-gray-700">
                    Capacité (nombre de places) *
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
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.capacite ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm`}
                      placeholder="ex: 30"
                    />
                  </div>
                  {errors.capacite && <p className="mt-1 text-sm text-red-600">{errors.capacite}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type de salle
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                    >
                      {typesSalle.map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Superficie */}
                <div className="sm:col-span-3">
                  <label htmlFor="superficie" className="block text-sm font-medium text-gray-700">
                    Superficie (m²)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="superficie"
                      id="superficie"
                      min="1"
                      value={formData.superficie}
                      onChange={handleChange}
                      className="block w-full pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                      placeholder="ex: 50"
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
                      <option value="disponible">Disponible</option>
                      <option value="occupee">Occupée</option>
                      <option value="maintenance">En maintenance</option>
                      <option value="reservee">Réservée</option>
                    </select>
                  </div>
                </div>

                {/* Équipements */}
                <div className="sm:col-span-6">
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mt-4">Équipements</h2>
                </div>

                <div className="sm:col-span-6">
                  <fieldset>
                    <legend className="text-sm font-medium text-gray-700">Équipements disponibles</legend>
                    <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-3">
                      {equipementsList.map((equipement) => (
                        <div key={equipement} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={`equipement-${equipement}`}
                              name="equipements"
                              type="checkbox"
                              value={equipement}
                              checked={formData.equipements.includes(equipement)}
                              onChange={handleEquipementChange}
                              className="focus:ring-[#0927EB] h-4 w-4 text-[#0927EB] border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={`equipement-${equipement}`} className="font-medium text-gray-700">
                              {equipement}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Accessibilité */}
                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="accessibilite"
                        name="accessibilite"
                        type="checkbox"
                        checked={formData.accessibilite}
                        onChange={handleChange}
                        className="focus:ring-[#0927EB] h-4 w-4 text-[#0927EB] border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="accessibilite" className="font-medium text-gray-700">
                        Accessible aux personnes à mobilité réduite
                      </label>
                    </div>
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
                      placeholder="Informations complémentaires sur la salle"
                    />
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
