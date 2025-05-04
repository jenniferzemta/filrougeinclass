"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  // Vérification des paramètres URL
  useEffect(() => {
    if (!searchParams.get('token') || !searchParams.get('email')) {
      navigate('/forgot-password')
    }
  }, [searchParams, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
    console.log({
            token: searchParams.get('token'), // Doit être identique à la DB
            email: searchParams.get('email')
    })
      // Étape 1 : Récupérer le cookie CSRF
      await axios.get('http://localhost:8000/sanctum/csrf-cookie')
      console.log({
        token: searchParams.get('token'), // Doit être identique à la DB
        email: searchParams.get('email')  // Doit correspondre à l'utilisateur
      })
      
      // Étape 2 : Envoyer la requête de réinitialisation
      const response = await axios.post('http://localhost:8000/api/reset-password', {
        token: searchParams.get('token'),
        email: searchParams.get('email'),
        password,
        password_confirmation: passwordConfirmation
      })

      if (response.status === 200) {
        setSuccess("Mot de passe réinitialisé avec succès !")
        setTimeout(() => navigate('/login'), 2000)
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setError(Object.values(error.response.data.errors).flat().join('\n'))
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Réinitialiser votre mot de passe
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10"
          >
            {success ? (
              <div className="text-center text-green-600 dark:text-green-400">
                {success}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {error && (
                  <div className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'En cours...' : 'Réinitialiser'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}