"use client"
import { motion } from "framer-motion"

const HomePage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-800"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <motion.div
            className="text-center md:text-left md:max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Simplifying Academic Management</h1>
            <p className="text-lg md:text-xl mb-8">
              A comprehensive platform for universities to manage academic schedules, internships, and student
              evaluations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                className="bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Comprehensive Academic Management
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform offers a suite of tools designed to streamline academic processes and enhance the educational
              experience.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-primary text-white p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">Academic Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Efficiently manage course schedules, room assignments, and faculty availability in one centralized
                system.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-secondary text-white p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">Evaluation Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Streamline the process of creating, administering, and grading assessments for continuous improvement.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-accent text-white p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">
                Internship Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Connect students with internship opportunities and manage the entire process from application to
                completion.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform simplifies academic management through an intuitive, step-by-step process.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary hidden md:block"></div>

            <div className="space-y-12 relative">
              <motion.div
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-center md:text-right">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Create Schedules</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Academic coordinators can easily create and manage course schedules, assign rooms, and allocate
                    resources.
                  </p>
                </div>
                <div className="md:w-12 flex justify-center">
                  <div className="bg-primary text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg z-10">
                    <span className="font-bold">1</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </motion.div>

              <motion.div
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-center md:text-right order-1 md:order-3"></div>
                <div className="md:w-12 flex justify-center order-2">
                  <div className="bg-secondary text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg z-10">
                    <span className="font-bold">2</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 order-3 md:order-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Manage Evaluations</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Create assessments, track student progress, and generate comprehensive reports on academic
                    performance.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-center md:text-right">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Coordinate Internships</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Post internship opportunities, manage applications, and track student progress throughout their
                    internships.
                  </p>
                </div>
                <div className="md:w-12 flex justify-center">
                  <div className="bg-accent text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg z-10">
                    <span className="font-bold">3</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">What Our Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from academic professionals who have transformed their institutions with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <img src="/placeholder.svg?height=60&width=60" alt="User" className="h-12 w-12 rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Dr. Sophie Martin</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Academic Director, Paris University</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "This platform has revolutionized how we manage our academic schedules. What used to take weeks now
                takes hours, allowing us to focus more on educational quality."
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <img src="/placeholder.svg?height=60&width=60" alt="User" className="h-12 w-12 rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Prof. Thomas Dubois</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Department Head, Lyon Business School</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "The internship management features have strengthened our relationships with industry partners and
                significantly improved our students' professional opportunities."
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <img src="/placeholder.svg?height=60&width=60" alt="User" className="h-12 w-12 rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Marie Leclerc</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Student Affairs Coordinator, Bordeaux Institute
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Students love having all their academic information in one place. The platform has drastically reduced
                administrative inquiries and improved student satisfaction."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Academic Management?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Join hundreds of educational institutions that have streamlined their processes with our platform.
            </p>
            <motion.button
              className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request a Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
