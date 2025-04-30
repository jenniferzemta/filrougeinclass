
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  BellIcon,
  PaintBrushIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
  CameraIcon,
} from "@heroicons/react/24/outline"

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    profileImage: "/placeholder.svg?height=200&width=200",
  })

  // Données fictives pour les paramètres
  const mockProfileData = {
    firstName: "Thomas",
    lastName: "Dubois",
    email: "thomas.dubois@etudiant.fr",
    phone: "06 12 34 56 78",
    address: "123 Rue des Étudiants, 75001 Paris",
    bio: "Étudiant en informatique passionné par le développement web et l'intelligence artificielle.",
    profileImage: "/placeholder.svg?height=200&width=200",
  }

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      setProfileData(mockProfileData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = () => {
    setSaving(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setSaving(false)
      setSuccessMessage("Profil mis à jour avec succès !")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1500)
  }

  const tabs = [
    { id: "profile", name: "Profil", icon: <UserIcon className="h-5 w-5" /> },
    { id: "security", name: "Sécurité", icon: <LockClosedIcon className="h-5 w-5" /> },
    { id: "notifications", name: "Notifications", icon: <BellIcon className="h-5 w-5" /> },
    { id: "privacy", name: "Confidentialité", icon: <ShieldCheckIcon className="h-5 w-5" /> },
  ]

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full border-4 border-[#0927EB] border-t-transparent animate-spin mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Chargement des paramètres...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <UserIcon className="h-8 w-8 mr-2 text-[#0927EB]" />
          Paramètres
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Gérez votre profil et vos préférences</p>
      </div>

      {/* Tabs et contenu */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation par onglets */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
            <nav className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-[#0927EB]/10 text-[#0927EB] dark:bg-[#0927EB]/20 dark:text-white font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span>{tab.name}</span>
                  {activeTab === tab.id && (
                    <motion.div layoutId="tabIndicator" className="ml-auto h-2 w-2 rounded-full bg-[#0927EB]" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Onglet Profil */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Informations personnelles</h2>

                {/* Photo de profil */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                  <div className="relative">
                    <img
                      src={profileData.profileImage || "/placeholder.svg"}
                      alt="Photo de profil"
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#0927EB]/20"
                    />
                    <button className="absolute bottom-0 right-0 bg-[#0927EB] text-white p-2 rounded-full hover:bg-[#0927EB]/90 transition-colors">
                      <CameraIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{profileData.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Ajoutez une photo de profil pour personnaliser votre compte
                    </p>
                  </div>
                </div>

                {/* Formulaire */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Message de succès */}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg text-green-800 dark:text-green-400 flex items-center"
                  >
                    <CheckIcon className="h-5 w-5 mr-2" />
                    {successMessage}
                  </motion.div>
                )}

                {/* Boutons d'action */}
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className={`px-4 py-2 rounded-lg text-white transition-colors ${
                      saving ? "bg-gray-400" : "bg-[#0927EB] hover:bg-[#0927EB]/90"
                    }`}
                  >
                    {saving ? (
                      <span className="flex items-center">
                        <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                        Enregistrement...
                      </span>
                    ) : (
                      "Enregistrer"
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Onglet Sécurité */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Sécurité du compte</h2>

                <div className="space-y-8">
                  {/* Changement de mot de passe */}
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Changer le mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Mot de passe actuel
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Confirmer le nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 bg-[#0927EB] text-white rounded-lg hover:bg-[#0927EB]/90 transition-colors"
                      >
                        Mettre à jour le mot de passe
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Onglet Notifications */}
            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Préférences de notifications</h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notifications par email</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Nouvelles offres de stage</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Recevez un email lorsque de nouvelles offres sont disponibles
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0927EB]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0927EB]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Mises à jour de l'emploi du temps</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Recevez un email lorsque votre emploi du temps est modifié
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0927EB]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0927EB]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Nouveaux supports de cours</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Recevez un email lorsque de nouveaux supports sont disponibles
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0927EB]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0927EB]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notifications push</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Alertes importantes</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Recevez des notifications pour les alertes importantes
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0927EB]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0927EB]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                     
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0927EB]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0927EB]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#0927EB] text-white rounded-lg hover:bg-[#0927EB]/90 transition-colors"
                  >
                    Enregistrer les préférences
                  </button>
                </div>
              </motion.div>
            )}

           

            {/* Onglet Confidentialité */}
            {activeTab === "privacy" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Supprimer mon compte
                    </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
