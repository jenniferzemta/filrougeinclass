"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  AcademicCapIcon,
  LightBulbIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline"
import { LinkedinIcon, TwitterIcon } from "react-share"
import { FaGithub } from "react-icons/fa"
import Navbar from "../../components/layouts/Navbar"
import Footer from "../../components/layouts/Footer"

// Placeholder images
const logcon =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
const team1 =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"

const About = () => {
  const [darkMode, setDarkMode] = useState(false)
  // Section Processus
  const processSteps = [
    {
      icon: <ChatBubbleBottomCenterTextIcon className="w-10 h-10" />,
      title: "Consultation",
      description: "We discuss your needs and goals to understand your requirements",
      color: "bg-opacity-30 bg-[#0923EB] text-[#0927EB]",
    },
    {
      icon: <Cog6ToothIcon className="w-10 h-10" />,
      title: "Implementation",
      description: "Our team executes the plan with precision and expertise",
      color: "bg-opacity-30 bg-[#FD6E47] text-[#FD6E47]",
    },
    {
      icon: <CheckBadgeIcon className="w-10 h-10" />,
      title: "Final Result",
      description: "We deliver exceptional results that exceed expectations",
      color: "bg-opacity-30 bg-[#16A637] text-[#16A637]",
    },
  ]

  // Section Team
  const teamMembers = [
    {
      name: "Jenny Alexander",
      role: "Chief Executive Officer",
      image: team1,
    },
    {
      name: "Olivia Hughes",
      role: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
    },
    {
      name: "Sophia Lewis",
      role: "IT Project Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Michael Brown",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      name: "Emma Wilson",
      role: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "David Thompson",
      role: "Lead Developer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    },
    {
      name: "Robert Garcia",
      role: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Lisa Martinez",
      role: "Customer Success",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    },
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
  // Carrousel infini
  const [currentSlide, setCurrentSlide] = useState(0)
  const itemsPerPage = 3
  const totalSlides = Math.ceil(teamMembers.length / itemsPerPage)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 4000) // Change toutes les 4 secondes
    return () => clearInterval(interval)
  }, [totalSlides])

  const visibleMembers = teamMembers.slice(currentSlide * itemsPerPage, (currentSlide + 1) * itemsPerPage)

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const carouselItem = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (

     <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    
    <div className="font-open">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[200px] md:h-[40vh] lg:h-[50vh] xl:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${logcon})`,
              backgroundSize: "cover",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
              filter: "brightness(0.7) contrast(1.1)",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0927eb]/90 via-[#0927eb]/60 to-[#000039]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-xl">
            À propos
          </h1>
          <div className="flex items-center justify-center text-gray-200 text-sm sm:text-base md:text-lg">
            <Link to="/" className="hover:text-white transition-colors duration-200">
              Accueil
            </Link>
            <span className="mx-2 sm:mx-3">/</span>
            <span className="text-white font-medium">À propos</span>
          </div>
        </div>
      </section>

      {/* Section Mission & Vision */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="bg-[#0927EB] p-2 rounded-lg mr-3">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-700">Notre Mission</h2>
            </div>
            <p className="text-[#0B2238] opacity-60 text-sm md:text-base">
              Transformer l'éducation supérieure grâce à des solutions innovantes qui simplifient la gestion académique
              et renforcent les liens entre les étudiants, les enseignants et les entreprises partenaires.
            </p>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="bg-[#0927EB] p-2 rounded-lg mr-3">
                <LightBulbIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-[#000039]">Notre Vision</h2>
            </div>
            <p className="text-[#0B2238] opacity-60 text-sm md:text-base">
              Devenir la plateforme de référence pour l'écosystème académique, en offrant une expérience unifiée qui
              optimise les processus éducatifs et favorise l'employabilité des étudiants.
            </p>
          </div>
        </div>
      </section>

      {/* Section Vidéo */}
      <section className="relative py-5 md:py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg mb-4">
          <iframe
            className="w-full h-64 sm:h-80 md:h-96"
            src="https://www.youtube.com/embed/video-id"
            title="Présentation de notre entreprise"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="relative bg-[#000036] rounded-lg shadow-xl mx-auto -mt-8 md:-mt-10 lg:-mt-12 md:ml-10 lg:ml-6 max-w-4xl py-4 px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/60">
            <div className="px-2 py-1 text-center">
              <p className="text-2xl md:text-4xl font-bold text-white">50+</p>
              <p className="text-base text-white/90">Établissements</p>
            </div>
            <div className="px-2 py-1 text-center">
              <p className="text-2xl md:text-4xl font-bold text-white">10K+</p>
              <p className="text-base text-white/90">Étudiants</p>
            </div>
            <div className="px-2 py-1 text-center">
              <p className="text-2xl md:text-4xl font-bold text-white">500+</p>
              <p className="text-base text-white/90">Entreprises</p>
            </div>
            <div className="px-2 py-1 text-center">
              <p className="text-2xl md:text-4xl font-bold text-white">95%</p>
              <p className="text-base text-white/90">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Processus */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-2xl font-bold text-[#0927EB] normal-case mb-4">Notre Processus</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              A systematic approach that delivers consistent, high-quality results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl gap-10 md:ml-20 lg:px-10 lg:ml-1">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`absolute -top-6 left-6 w-14 h-14 ${step.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">{step.title}</h3>
                <p className="text-[#0B2238] opacity-60">{step.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0927EB] via-[#FD6E47] to-[#16A637] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Team - Carrousel */}
      <section className="relative py-10 px-4 sm:px-10 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4">Nos Experts</h2>
          <button className="text-white text-base bg-[#FD6E47] rounded-lg w-28 h-[40px] hover:text-[#FD6E47] hover:bg-white border hover:border-[#FD6E47] font-medium transition-colors">
            Voir →
          </button>
        </div>

        <div className="relative overflow-hidden h-[300px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 absolute inset-0"
            >
              {visibleMembers.map((member, index) => (
                <motion.div
                  key={`${currentSlide}-${index}`}
                  variants={carouselItem}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl shadow-lg h-full"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="aspect-square overflow-hidden h-full">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-[#000039]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a href="#" className="text-white hover:text-blue-400 transition-colors">
                      <LinkedinIcon size={32} round />
                    </a>
                    <a href="#" className="text-white hover:text-blue-400 transition-colors">
                      <TwitterIcon size={32} round />
                    </a>
                    <a href="#" className="text-white hover:text-blue-400 transition-colors">
                      <FaGithub size={32} className="bg-white text-gray-800 rounded-full p-1" />
                    </a>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-[#0927EB]" : "bg-gray-300"}`}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>
      </section>
      <Footer/>
    </div>
    </div>
  )
}

export default About
