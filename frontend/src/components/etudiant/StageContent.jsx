import { useState, useEffect } from 'react';
import { 
  ArrowDownTrayIcon, 
  ArrowPathIcon, 
  BellIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import etudiantStageService from '../../services/etudiantStageService';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function StageContent() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastChecked, setLastChecked] = useState(new Date().toISOString());
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    loadOffres();
    
    const interval = setInterval(() => {
      checkNewOffers();
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const loadOffres = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      const data = await etudiantStageService.getActiveOffers();
      setOffres(data);
      setLastChecked(new Date().toISOString());
      localStorage.setItem('lastOffersCheck', new Date().toISOString());
      setShowNotification(false);
    } catch (error) {
      console.error('Erreur chargement offres:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const checkNewOffers = async () => {
    try {
      const lastCheck = localStorage.getItem('lastOffersCheck') || lastChecked;
      const newOffers = await etudiantStageService.getActiveOffers(lastCheck);
      
      if (newOffers.length > 0) {
        localStorage.setItem('hasNewOffers', 'true');
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Erreur vérification nouvelles offres:', error);
    }
  };

  const handleDownload = async (id, titre) => {
    try {
      const blob = await etudiantStageService.downloadImage(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `offre-stage-${titre}.jpg`.replace(/\s+/g, '_'));
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Notification de téléchargement
      toast.success(`Offre "${titre}" téléchargée`);
    } catch (error) {
      console.error('Erreur téléchargement:', error);
      toast.error('Erreur lors du téléchargement');
    }
  };

  if (loading && offres.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <ArrowPathIcon className="h-12 w-12 animate-spin text-blue-500 mb-4" />
        <p className="text-lg text-gray-600">Chargement des offres...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
      {/* Header avec notification */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Offres de stage
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {offres.length} offre{offres.length !== 1 ? 's' : ''} disponible{offres.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {showNotification && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg"
            >
              <BellIcon className="h-5 w-5 mr-2 animate-pulse" />
              <span>Nouvelles offres disponibles !</span>
            </motion.div>
          )}
          
          <button 
            onClick={loadOffres}
            disabled={refreshing}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              refreshing ? 'bg-gray-200 text-gray-500' : 'bg-white text-blue-600 shadow-sm hover:shadow-md'
            }`}
          >
            <ArrowPathIcon className={`h-5 w-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Liste des offres */}
      {offres.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offres.map((offre, index) => (
            <motion.div
              key={offre.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image de l'offre */}
              <div className="relative h-64 w-full overflow-hidden group">
                <img
                  src={`http://localhost:8000/storage/${offre.image_path}`}
                  alt={offre.titre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button 
                    onClick={() => handleDownload(offre.id, offre.titre)}
                    className="flex items-center px-3 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                    {offre.titre}
                  </h2>
                </div>

                {offre.domaine && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full mb-4">
                    {offre.domaine.nom}
                  </span>
                )}

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleDownload(offre.id, offre.titre)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
          <InformationCircleIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Aucune offre disponible
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Aucune offre de stage active pour le moment. Revenez plus tard.
          </p>
          <button
            onClick={loadOffres}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Actualiser
          </button>
        </div>
      )}
    </div>
  );
}