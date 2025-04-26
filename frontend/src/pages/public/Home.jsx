import { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import home from './../../assets/home.jpg';
import {
  AcademicCapIcon,
  CalendarIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  UserGroupIcon,
  ChartBarIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(1)

  // FAQ data
  const faqData = [
    {
      id: 1,
      question: "Quels services propose votre plateforme de gestion académique ?",
      answer:
        "Notre plateforme propose une gestion complète des emplois du temps, la planification des cours, le suivi des évaluations, la gestion des stages, les programmes d'études, et des outils statistiques avancés pour analyser les performances.",
    },
    {
      id: 2,
      question: "Comment puis-je intégrer cette solution dans mon établissement ?",
      answer:
        "Nous offrons un processus d'intégration complet avec formation du personnel, migration des données existantes et support technique continu. Notre équipe vous accompagne à chaque étape du déploiement.",
    },
    {
      id: 3,
      question: "La plateforme est-elle accessible sur mobile ?",
      answer:
        "Oui, notre plateforme est entièrement responsive et fonctionne sur tous les appareils : ordinateurs, tablettes et smartphones. Nous proposons également une application mobile dédiée pour un accès encore plus pratique.",
    },
    {
      id: 4,
      question: "Quelles mesures de sécurité sont en place pour protéger nos données ?",
      answer:
        "Nous utilisons le chiffrement des données, l'authentification à deux facteurs, des sauvegardes régulières et des audits de sécurité pour garantir la protection complète de vos données académiques sensibles.",
    },
    {
      id: 5,
      question: "Proposez-vous un support technique 24/7 ?",
      answer:
        "Oui, notre équipe de support technique est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions et résoudre rapidement tout problème technique que vous pourriez rencontrer.",
    },
  ]

  // Partners data
  const partners = [
    { id: 1, name: "Université Paris-Sorbonne", logo: "/placeholder.svg?height=60&width=160" },
    { id: 2, name: "École Polytechnique", logo: "/placeholder.svg?height=60&width=160" },
    { id: 3, name: "HEC Paris", logo: "/placeholder.svg?height=60&width=160" },
    { id: 4, name: "Sciences Po", logo: "/placeholder.svg?height=60&width=160" },
    { id: 5, name: "ESSEC Business School", logo: "/placeholder.svg?height=60&width=160" },
    { id: 6, name: "Centrale Supélec", logo: "/placeholder.svg?height=60&width=160" },
    { id: 7, name: "ESCP Business School", logo: "/placeholder.svg?height=60&width=160" },
    { id: 8, name: "ENSAE Paris", logo: "/placeholder.svg?height=60&width=160" },
  ]

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("darkMode", newMode)
    document.documentElement.classList.toggle("dark")
  }

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0927EB] to-[#0927EB]/90">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FD6E47]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#16A637]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white">
                Simplifiez votre <span className="text-[#FD6E47]">gestion académique</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto md:mx-0">
                Une plateforme intuitive pour gérer emplois du temps et stages en un seul endroit.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/register"
                  className="px-8 py-3 rounded-lg bg-white text-[#0927EB] font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Commencer 
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 rounded-lg border border-white/30 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  En savoir plus <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0927EB]/50 via-transparent to-[#FD6E47]/30"></div>
                <img
                  src={home}
                  alt="Plateforme de gestion académique"
                  className="w-full h-auto"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <CalendarIcon className="h-6 w-6 text-[#0927EB]" />
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <AcademicCapIcon className="h-6 w-6 text-[#FD6E47]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Scrolling Banner */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Ils nous font confiance</h2>
        </div>

        <div className="relative">
          <div className="flex space-x-12 animate-marquee">
            {partners.concat(partners).map((partner, index) => (
              <div key={`${partner.id}-${index}`} className="flex-shrink-0 flex items-center justify-center h-16 px-8">
                <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="h-10 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#0927EB]">98%</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Satisfaction</p>
            </div>

            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#FD6E47]">50+</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Établissements</p>
            </div>

            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#16A637]">10k+</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Utilisateurs</p>
            </div>

            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#0927EB]">24/7</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Tout ce dont vous avez besoin
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Une solution complète pour tous les acteurs de l'enseignement supérieur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#0927EB]/10 flex items-center justify-center mb-6">
                <CalendarIcon className="h-6 w-6 text-[#0927EB]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Emplois du temps</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Créez et gérez facilement les emplois du temps et l'attribution des salles.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Planification intuitive</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Gestion des conflits</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#FD6E47]/10 flex items-center justify-center mb-6">
                <DocumentTextIcon className="h-6 w-6 text-[#FD6E47]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Évaluations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Automatisez le suivi des contrôles continus et des sessions normales.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Notation simplifiée</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Statistiques détaillées</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#16A637]/10 flex items-center justify-center mb-6">
                <BriefcaseIcon className="h-6 w-6 text-[#16A637]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Stages</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Centralisez les offres de stage et facilitez leur mise en relation avec les étudiants.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Dépôt d'offres</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Suivi des candidatures</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#0927EB]/10 flex items-center justify-center mb-6">
                <AcademicCapIcon className="h-6 w-6 text-[#0927EB]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Programmes</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gérez les programmes de cours et les affectations des enseignants.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Création de cursus</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Gestion des modules</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#FD6E47]/10 flex items-center justify-center mb-6">
                <UserGroupIcon className="h-6 w-6 text-[#FD6E47]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Étudiants</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Suivez les informations des étudiants et leur progression académique.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Profils complets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Suivi des absences</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#16A637]/10 flex items-center justify-center mb-6">
                <ChartBarIcon className="h-6 w-6 text-[#16A637]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Statistiques</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Analysez les performances et générez des rapports détaillés.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Tableaux de bord</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#16A637] flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Exports personnalisés</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#001140] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Témoignages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0A1D56] p-6 rounded-xl">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-3">Une expérience exceptionnelle !</h3>
              <p className="text-gray-300 mb-6">
                La plateforme a révolutionné notre façon de gérer les emplois du temps. Nous avons gagné un temps
                précieux et réduit considérablement les erreurs. L'équipe de support est réactive et toujours prête à
                nous aider.
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-[#0927EB] flex items-center justify-center text-white font-medium mr-4">
                  PR
                </div>
                <div>
                  <h4 className="font-medium">Prof. Robert</h4>
                  <p className="text-gray-400 text-sm">Responsable Académique</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0A1D56] p-6 rounded-xl">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-3">Fortement recommandé !</h3>
              <p className="text-gray-300 mb-6">
                La centralisation des offres de stage a grandement facilité notre travail. Les étudiants trouvent plus
                facilement des stages adaptés à leur profil et nos partenaires professionnels sont ravis de la
                simplicité du processus.
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-[#FD6E47] flex items-center justify-center text-white font-medium mr-4">
                  SM
                </div>
                <div>
                  <h4 className="font-medium">Sophie Martin</h4>
                  <p className="text-gray-400 text-sm">Responsable de Stage</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0A1D56] p-6 rounded-xl">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-3">Interface intuitive et efficace</h3>
              <p className="text-gray-300 mb-6">
                Avoir accès à mon emploi du temps et aux offres de stage sur une seule plateforme me fait gagner
                beaucoup de temps. L'interface est intuitive et les notifications me permettent de ne rien manquer.
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-[#16A637] flex items-center justify-center text-white font-medium mr-4">
                  TD
                </div>
                <div>
                  <h4 className="font-medium">Thomas Dubois</h4>
                  <p className="text-gray-400 text-sm">Étudiant</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0A1D56] p-6 rounded-xl">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-600"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-3">Solution complète et adaptable</h3>
              <p className="text-gray-300 mb-6">
                L'intégration des différents modules nous a permis de simplifier considérablement notre gestion
                administrative. Les rapports statistiques nous aident à prendre des décisions basées sur des données
                concrètes.
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-[#0927EB] flex items-center justify-center text-white font-medium mr-4">
                  LC
                </div>
                <div>
                  <h4 className="font-medium">Laurent Cohen</h4>
                  <p className="text-gray-400 text-sm">Directeur d'établissement</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            <span className="w-3 h-3 bg-[#0927EB] rounded-full"></span>
            <span className="w-3 h-3 bg-white/30 rounded-full"></span>
            <span className="w-3 h-3 bg-white/30 rounded-full"></span>
            <span className="w-3 h-3 bg-white/30 rounded-full"></span>
            <span className="w-3 h-3 bg-white/30 rounded-full"></span>
          </div>
        </div>
      </section>

     {/* Newsletter Section */}
     <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block text-[#0927EB] text-sm font-medium mb-2">// Notre Newsletter</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Abonnez-vous pour <span className="text-[#0927EB]">des conseils d'experts</span>
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-[#0927EB] mb-8">et des offres spéciales</h3>

          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                placeholder="Entrez votre adresse email"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0927EB]"
              />
            </div>
            <button className="bg-[#0927EB] hover:bg-[#0927EB]/90 text-white font-medium px-8 py-3 rounded-lg transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
         {/* FAQ Section */}
         <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Questions fréquentes</h2>

              <div className="space-y-4">
                {faqData.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                    >
                      <span className="text-lg font-medium text-gray-900 dark:text-white text-left">
                        {item.question}
                      </span>
                      {activeQuestion === item.id ? (
                        <MinusIcon className="h-5 w-5 text-[#0927EB]" />
                      ) : (
                        <PlusIcon className="h-5 w-5 text-[#0927EB]" />
                      )}
                    </button>

                    {activeQuestion === item.id && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#001140] text-white rounded-lg p-6 self-start">
              <div className="mb-6 flex justify-center">
                <div className="w-14 h-14 rounded-full bg-[#0927EB]/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#4D7DF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-center mb-2">Vous avez d'autres questions ?</h3>
              <p className="text-center text-gray-300 mb-6">
                Notre équipe répondra à toutes vos questions. Nous garantissons une réponse rapide.
              </p>

              <Link
                href="/contact"
                className="block w-full bg-[#0927EB] hover:bg-[#0927EB]/90 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors"
              >
                Contactez-nous
              </Link>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center">
                  <PhoneIcon className="h-5 w-5 text-[#4D7DF9] mr-2" />
                  <div>
                    <p className="text-sm">Votre confort, notre priorité</p>
                    <p className="font-semibold">Service 24/7</p>
                    <p>676 33 05 21</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0927EB] to-[#0927EB]/80 relative overflow-hidden">
        <div className="absolute bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FD6E47]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#16A637]/20 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-3xl font-bold text-white mb-6">
            Prêt à transformer votre gestion académique ?
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Rejoignez les nombreux établissements qui ont déjà adopté notre solution et simplifiez votre quotidien.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register"
              className="px-8 py-4 rounded-lg bg-white text-[#0927EB] font-medium hover:bg-gray-100 transition-all shadow-lg"
            >
              Commencer gratuitement
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all"
            >
              Demander une démo
            </Link>
          </div>
        </div>
      </section>

    <Footer/>
    </div>
  )
}
