import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SidebarItem({ icon, text, to, hasAlert }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (hasAlert && !isActive) {
      setIsBlinking(true);
      const interval = setInterval(() => {
        setIsBlinking(prev => !prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasAlert, isActive]);

  const handleClick = () => {
    if (hasAlert) {
      localStorage.removeItem('hasNewOffers');
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="mb-2"
    >
      <Link
        to={to}
        onClick={handleClick}
        className={`
          flex items-center w-full p-3 rounded-xl transition-colors
          ${isActive 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' 
            : 'text-white hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }
          ${isBlinking ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20' : ''}
          relative
        `}
      >
        <div className="flex items-center">
          <span className="flex items-center justify-center w-6 h-6 mr-3">
            {icon}
          </span>
          <span className="font-medium">{text}</span>
        </div>
        
        {hasAlert && !isActive && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-3 top-3 w-2.5 h-2.5 bg-red-500 rounded-full"
          />
        )}
      </Link>
    </motion.div>
  );
}