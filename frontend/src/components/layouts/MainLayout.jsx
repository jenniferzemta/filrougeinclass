// // components/layouts/MainLayout.js
// import Sidebar from './Sidebar';
// import { Bars3Icon, XMarkIcon ,MagnifyingGlassIcon, BellIcon, UserCircleIcon , MoonIcon,SunIcon } from '@heroicons/react/24/outline';
// import { useState } from 'react';

// const MainLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [activeTab, setActiveTab] = useState('today');

//   return (
//     <div className="min-h-screen flex bg-gray-50 text-gray-900">
//       {/* Sidebar */}
//       <div className={`fixed lg:static z-20 w-64 h-full transition-transform duration-300 ease-in-out 
//         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
//         <Sidebar />
//       </div>

//       {/* Overlay (mobile) */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" 
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main content */}
//       <div className="flex-1 overflow-x-hidden">
//         {/* Navbar */}
       
//       {/* Contenu principal */}
//       <div className="flex-1 overflow-x-hidden">
//          {/* Navbar */}
//         <header className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
//           <div className="px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between h-16 items-center">
    
//                {/* Bouton hamburger (mobile) */}
    
//                <button 
    
//                  className="lg:hidden p-2 rounded-md focus:outline-none"
    
//                  onClick={() => setSidebarOpen(!sidebarOpen)}
    
//                >
    
//                  {sidebarOpen ? (
    
//                    <XMarkIcon className="h-6 w-6" />
    
//                  ) : (
    
//                    <Bars3Icon className="h-6 w-6" />
    
//                  )}
    
//                </button>

    
//                {/* Logo */}
    
//                <div className="flex items-center lg:ml-0">
               
    
//                  <span className="ml-3 text-xl font-semibold">DASHBOARD</span>
    
//                </div>

    
//                {/* Elements côté droit */}
    
//                <div className="flex items-center space-x-4">
//                 {/* Barre de recherche (masquée sur mobile) */}
//                 <div className="relative hidden md:block">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Rechercher..."
//                     className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64`}
//                   />
//                 </div>

//                 {/* Bouton mode sombre */}
//                 <button
//                   onClick={() => setDarkMode(!darkMode)}
//                   className={`p-2 rounded-full ${darkMode ? 'text-yellow-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
//                 >
//                   {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
//                 </button>

//                 {/* Notification */}
//                 <button className={`p-2 rounded-full relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
//                   <BellIcon className="h-6 w-6" />
//                   <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
//                 </button>

//                 {/* Avatar utilisateur */}
//                 <div className="flex items-center space-x-2">
//                   <UserCircleIcon className="h-8 w-8" />
//                   <span className="hidden md:inline">Admin</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page-specific content */}
//         <main className="px-4 sm:px-6 lg:px-8 py-6">
//           {children}
//         </main>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default MainLayout;
