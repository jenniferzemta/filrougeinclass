import { useEffect } from 'react';
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, darkMode }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : ''}`}>{title}</h3>
          <p className={`my-4 ${darkMode ? 'text-gray-300' : ''}`}>{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded`}
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ConfirmationModal;