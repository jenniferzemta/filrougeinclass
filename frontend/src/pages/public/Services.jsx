import { motion } from "framer-motion"
import Navbar from "../../components/layouts/Navbar"
import {
  AcademicCapIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline"
import Footer from "../../components/layouts/Footer"


export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Nos Services</span>
              <span className="block text-[#0927EB]">Pour l'Enseignement Supérieur</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Des solutions complètes pour simplifier la gestion académique et des stages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Services Principaux</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Découvrez nos solutions adaptées aux besoins des établissements d'enseignement supérieur.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 rounded-md bg-[#0927EB] flex items-center justify-center mb-4">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Gestion des Emplois du Temps</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Créez, modifiez et partagez facilement les emplois du temps des cours. Attribuez les salles et les
                ressources nécessaires pour chaque cours.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#0927EB] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Planification intuitive des cours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0927EB] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Gestion des salles et ressources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0927EB] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Calendrier interactif</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 rounded-md bg-[#FD6E47] flex items-center justify-center mb-4">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Gestion des Évaluations</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Programmez les contrôles continus et les sessions normales. Suivez les résultats et générez des rapports
                détaillés.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#FD6E47] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Planification des évaluations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FD6E47] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Suivi des résultats</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FD6E47] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Génération de rapports</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 rounded-md bg-[#16A637] flex items-center justify-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Gestion des Stages</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Centralisez les offres de stage et facilitez leur mise en relation avec les étudiants. Suivez les
                conventions et planifiez les soutenances.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#16A637] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Dépôt d'offres de stage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#16A637] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Suivi des candidatures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#16A637] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Planification des soutenances</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 rounded-md bg-[#0927EB] flex items-center justify-center mb-4">
                <AcademicCapIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Gestion des Programmes</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Créez et gérez les programmes de cours. Affectez les enseignants aux différents cours et modules.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#0927EB] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Création de programmes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0927EB] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Affectation des enseignants</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0927EB] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Suivi des modules</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 rounded-md bg-[#FD6E47] flex items-center justify-center mb-4">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Gestion des Étudiants</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Suivez les informations des étudiants, leurs résultats et leur progression académique.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#FD6E47] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Profils étudiants</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FD6E47] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Suivi des résultats</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FD6E47] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Gestion des absences</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 rounded-md bg-[#16A637] flex items-center justify-center mb-4">
                <BuildingOfficeIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Relations Entreprises</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Gérez les relations avec les entreprises partenaires et facilitez les interactions.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#16A637] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Profils entreprises</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#16A637] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Suivi des partenariats</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#16A637] mr-2">•</span>
                  <span className="text-gray-600 dark:text-gray-300">Organisation d'événements</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Comment Ça Marche</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Un processus simple pour intégrer notre plateforme à votre établissement.
            </p>
          </motion.div>

          <div className="relative">
            {/* Process steps */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col md:flex-row items-center"
              >
                <div className="flex-1 md:text-right md:pr-8">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0927EB] text-white font-bold mb-2 md:mb-0">
                    1
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Consultation</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Nous discutons de vos besoins spécifiques et des défis que vous rencontrez.
                  </p>
                </div>
                <div className="hidden md:block h-8 w-8 rounded-full bg-[#0927EB] border-4 border-white dark:border-gray-800 absolute left-1/2 transform -translate-x-1/2"></div>
                <div className="flex-1 md:pl-8 mt-4 md:mt-0"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col md:flex-row items-center"
              >
                <div className="flex-1 md:text-right md:pr-8 md:order-1 order-2 mt-4 md:mt-0"></div>
                <div className="hidden md:block h-8 w-8 rounded-full bg-[#FD6E47] border-4 border-white dark:border-gray-800 absolute left-1/2 transform -translate-x-1/2"></div>
                <div className="flex-1 md:pl-8 md:order-2 order-1">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FD6E47] text-white font-bold mb-2 md:mb-0">
                    2
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Configuration</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Nous configurons la plateforme selon vos besoins et importons vos données existantes.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col md:flex-row items-center"
              >
                <div className="flex-1 md:text-right md:pr-8">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#16A637] text-white font-bold mb-2 md:mb-0">
                    3
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Formation</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Nous formons votre équipe à l'utilisation de la plateforme et de ses fonctionnalités.
                  </p>
                </div>
                <div className="hidden md:block h-8 w-8 rounded-full bg-[#16A637] border-4 border-white dark:border-gray-800 absolute left-1/2 transform -translate-x-1/2"></div>
                <div className="flex-1 md:pl-8 mt-4 md:mt-0"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col md:flex-row items-center"
              >
                <div className="flex-1 md:text-right md:pr-8 md:order-1 order-2 mt-4 md:mt-0"></div>
                <div className="hidden md:block h-8 w-8 rounded-full bg-[#0927EB] border-4 border-white dark:border-gray-800 absolute left-1/2 transform -translate-x-1/2"></div>
                <div className="flex-1 md:pl-8 md:order-2 order-1">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0927EB] text-white font-bold mb-2 md:mb-0">
                    4
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Support Continu</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Nous assurons un support technique et des mises à jour régulières de la plateforme.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Tarification</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Des formules adaptées à tous les types d'établissements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Essentiel</h3>
                <p className="mt-4">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">2000 FCFA</span>
                  <span className="text-gray-600 dark:text-gray-300"> /mois</span>
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Pour les petits établissements</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Gestion des emplois du temps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Gestion des évaluations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Jusqu'à 500 étudiants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">✗</span>
                    <span className="text-gray-400 dark:text-gray-500">Gestion des stages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">✗</span>
                    <span className="text-gray-400 dark:text-gray-500">Support prioritaire</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="block w-full py-2 px-4 border border-[#0927EB] rounded-md text-[#0927EB] text-center font-medium hover:bg-[#0927EB] hover:text-white transition-colors"
                  >
                    Commencer
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-2 border-[#0927EB]"
            >
              <div className="p-6 bg-[#0927EB]">
                <h3 className="text-lg font-medium text-white">Pro</h3>
                <p className="mt-4">
                  <span className="text-3xl font-extrabold text-white">5000 FCFA</span>
                  <span className="text-blue-100"> /mois</span>
                </p>
                <p className="mt-2 text-blue-100">Pour les établissements moyens</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Gestion des emplois du temps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Gestion des évaluations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Gestion des stages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Jusqu'à 2000 étudiants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">✗</span>
                    <span className="text-gray-400 dark:text-gray-500">Support prioritaire</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="block w-full py-2 px-4 bg-[#0927EB] rounded-md text-white text-center font-medium hover:bg-blue-700 transition-colors"
                  >
                    Commencer
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Entreprise</h3>
                <p className="mt-4">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">1000 FCFA</span>
                  <span className="text-gray-600 dark:text-gray-300"> /mois</span>
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Pour les grands établissements</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Gestion des emplois du temps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Gestion des évaluations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Gestion des stages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Étudiants illimités</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0927EB] mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Support prioritaire</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="block w-full py-2 px-4 border border-[#0927EB] rounded-md text-[#0927EB] text-center font-medium hover:bg-[#0927EB] hover:text-white transition-colors"
                  >
                    Contacter les ventes
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Questions Fréquentes</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Trouvez des réponses aux questions les plus courantes.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Combien de temps faut-il pour mettre en place la plateforme ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                La mise en place de la plateforme prend généralement entre 2 et 4 semaines, selon la taille de
                l'établissement et la complexité des données à importer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                La plateforme est-elle compatible avec nos systèmes existants ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Oui, notre plateforme est conçue pour s'intégrer facilement avec la plupart des systèmes existants. Nous
                proposons des API et des connecteurs pour faciliter l'intégration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Proposez-vous des formations pour notre personnel ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Oui, nous proposons des formations complètes pour tous les utilisateurs de la plateforme, des
                administrateurs aux enseignants et aux étudiants.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Quelles sont les mesures de sécurité mises en place ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nous utilisons des protocoles de sécurité avancés pour protéger vos données, notamment le chiffrement
                SSL, l'authentification à deux facteurs et des sauvegardes régulières.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Peut-on personnaliser la plateforme selon nos besoins ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolument, nous offrons de nombreuses options de personnalisation pour adapter la plateforme à vos
                processus spécifiques et à votre identité visuelle.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0927EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-white sm:text-4xl mb-6"
          >
            Prêt à transformer votre gestion académique ?
          </motion.h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100 mb-10">
            Contactez-nous dès aujourd'hui pour une démonstration personnalisée.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <a
              href="/contact"
              className="px-8 py-3 rounded-md bg-white text-[#0927EB] font-medium hover:bg-gray-100 transition-colors"
            >
              Demander une démo
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
