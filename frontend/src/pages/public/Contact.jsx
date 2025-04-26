import React from "react";
import Navbar from "../../components/layouts/Navbar";
import logcon from './../../assets/contact1.jpg';
import Footer from "../../components/layouts/Footer";
import {EnvelopeIcon,PhoneIcon,ClockIcon} from "@heroicons/react/24/outline"

const Contact = () => {
  return (
    <div className="font-open ">
      {/* Navbar */}
      {/* <nav className="bg-[#0927eb] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">AcademicFlow</span>
          </div>
      
        </div>
      </nav> */}
      <Navbar/>
  
      {/* Hero simple */}

          <section className="relative h-[40vh] min-h-[300px] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Conteneur image + overlay */}
      <div className="absolute inset-0 w-full h-full">
        {/* Image responsive - charge la taille adaptée selon l'écran */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{   backgroundImage: `url(${logcon})`,backgroundSize: 'cover', backgroundPosition: 'center center',  backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay dynamique */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000039] via-[#1d2951]/15 to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Contenu centré responsive */}
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto">
        <h1 className="text-3xl xs:text-2xl sm:text-3xl md:text-3xl font-bold text-white mb-3 md:mb-4 drop-shadow-xl">
          Contactez-nous
        </h1>
        
        <div className="flex items-center justify-center text-gray-200 text-sm sm:text-base md:text-lg">
          <a href="/" className="hover:text-white transition-colors duration-200">Accueil</a>
          <span className="mx-2 sm:mx-3">/</span>
          <span className="text-white font-medium">Contact</span>
        </div>
      </div>
    </section>
      
  

 {/* Contact Section */}
 <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#001140] text-white rounded-lg p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:16px_16px]"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Adresse</h3>
                <p className="mb-8">
                  Douala, Cameroun
                  <br />
                  Ndogbong 
                </p>

                <h3 className="text-2xl font-bold mb-6">Contact</h3>
                <p className="flex items-center mb-2">
                  <PhoneIcon className="h-5 w-5 mr-2" />+237 676 33 05 21
                </p>
                <p className="flex items-center mb-8">
                  <EnvelopeIcon className="h-5 w-5 mr-2 " /> contactakademic@gmail.com
                </p>

                <h3 className="text-2xl font-bold mb-6">Horaires d'ouverture</h3>
                <p className="flex items-center mb-8">
                  <ClockIcon className="h-5 w-5 mr-2" /> Lundi - Vendredi : 9:00 - 18:00
                </p>

                <h3 className="text-2xl font-bold mb-6">Restez connecté</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-block text-[#0027EB] text-sm font-medium mb-2">// Contactez-nous</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Obtenez votre <span className="text-[#0927EB]">devis gratuit</span> aujourd'hui !
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Remplissez le formulaire ci-dessous et notre équipe vous contactera rapidement
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Votre nom 
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Ex. Jean Dupont"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email 
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Téléphone 
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Entrez votre numéro"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Service 
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">Sélectionnez un service</option>
                        <option value="gestion-emploi-temps">Gestion des emplois du temps</option>
                        <option value="gestion-evaluations">Gestion des évaluations</option>
                        <option value="gestion-stages">Gestion des stages</option>
                        <option value="solution-complete">Solution complète</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Votre message 
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Entrez votre message ici..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#0927EB] hover:bg-white border hover:border-[#0927EB]  hover:text-[#0927EB] text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Section Carte */}
      <div className="container mx-auto max-w-7xl px-4 lg:px-10">
        <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.99144060821!2d2.292292615509614!3d48.85837360866185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className="py-5">
        <Footer/>
      </div>
    </div>
  );
};

export default Contact;