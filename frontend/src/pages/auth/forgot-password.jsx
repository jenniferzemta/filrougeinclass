import { useState } from "react"
import { motion } from "framer-motion"
import {Link} from "react-router-dom"

import axios from "axios"



export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setError("")
  //   setIsLoading(true)

  //   // Simulate password reset request
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     if (email) {
  //       setIsSubmitted(true)
  //     } else {
  //       setError("Veuillez entrer une adresse email valide.")
  //     }
  //   }, 1500)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Récupération du cookie CSRF
      await axios.get('/sanctum/csrf-cookie')

      // Envoi de la requête à l'API
      const response = await axios.post('http://localhost:8000/api/forgot-password', { email })

      if (response.status === 200) {
        setIsSubmitted(true)
      }
    } catch (error) {
      if (error.response) {
        // Gestion des erreurs de validation
        if (error.response.data.errors?.email) {
          setError(error.response.data.errors.email[0])
        } else {
          setError("Une erreur s'est produite. Veuillez réessayer.")
        }
      } else {
        setError("Problème de connexion au serveur")
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  
      <div className="flex min-h-[calc(100vh-64px)] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#0927EB] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Réinitialisation du mot de passe
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10"
          >
            {isSubmitted ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">Instructions envoyées</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Si un compte existe avec l'adresse email {email}, vous recevrez un email avec les instructions pour
                  réinitialiser votre mot de passe.
                </p>
                <div className="mt-6">
                  <Link href="/login" className="text-sm font-medium text-[#0927EB] hover:text-blue-500">
                    Retour à la page de connexion
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
                      </div>
                    </div>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Adresse email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0927EB] focus:border-[#0927EB] dark:bg-gray-700 dark:text-white"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0927EB] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB] disabled:opacity-50"
                    >
                      {isLoading ? "Envoi en cours..." : "Envoyer les instructions"}
                    </motion.button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <Link href="/login" className="text-sm font-medium text-[#0927EB] hover:text-blue-500">
                    Retour à la page de connexion
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

    </div>
  )
}
