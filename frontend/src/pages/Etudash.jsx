// import { useState, useEffect } from "react";
// import {
//   SunIcon,
//   MoonIcon,
//   BellIcon,
//   UserCircleIcon,
//   MagnifyingGlassIcon,
//   AcademicCapIcon,
//   BuildingOffice2Icon,
//   ArrowLeftOnRectangleIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/outline";

// export default function Etudash() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [activeSection, setActiveSection] = useState("schedules");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   const Sidebar = () => (
//     <div className={`w-16 md:w-56 h-screen bg-[#0927EB] flex flex-col transition-all duration-300 border-r border-gray-200 fixed lg:static z-50 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
//       <div className="p-4 flex justify-center items-center h-24 border-opacity-20">
//         <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto" />
//       </div>
//       <nav className="flex-1 flex flex-col items-center md:items-start px-2 space-y-1 mt-5 overflow-y-auto">
//         <SidebarItem
//           icon={<AcademicCapIcon className="h-5 w-5" />}
//           text="Emploi du temps"
//           active={activeSection === "schedules"}
//           onClick={() => setActiveSection("schedules")}
//         />
//         <SidebarItem
//           icon={<BuildingOffice2Icon className="h-5 w-5" />}
//           text="Offres de stages"
//           active={activeSection === "internships"}
//           onClick={() => setActiveSection("internships")}
//         />
//         <SidebarItem
//           icon={<UserCircleIcon className="h-5 w-5" />}
//           text="Profil"
//           active={activeSection === "profile"}
//           onClick={() => setActiveSection("profile")}
//         />
//         <SidebarItem
//           icon={<ArrowLeftOnRectangleIcon className="h-5 w-5" />}
//           text="Déconnexion"
//           onClick={() => console.log("Déconnexion")}
//         />
//       </nav>
//     </div>
//   );

//   const SidebarItem = ({ icon, text, active, onClick }) => (
//     <button
//       className={`flex items-center w-full p-2 rounded-full transition-all duration-200 ${
//         active ? "bg-white text-black" : "text-white hover:bg-white hover:bg-opacity-20"
//       }`}
//       onClick={onClick}
//     >
//       <span className="mx-auto md:mx-0 md:mr-3">{icon}</span>
//       <span className="hidden md:inline font-medium text-sm">{text}</span>
//     </button>
//   );

//   const MainContent = () => {
//     switch (activeSection) {
//       case "schedules":
//         return <div>Content for Schedules</div>;
//       case "internships":
//         return <div>Content for Internships</div>;
//       case "profile":
//         return <div>Content for Profile</div>;
//       default:
//         return <div>Content for Schedules</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       <Sidebar />
//       {sidebarOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
//       )}
//       <div className={`flex-1 flex flex-col overflow-hidden ${darkMode ? "dark" : ""}`}>
//         <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
//           <div className="px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
//             <button className="lg:hidden p-2 rounded-md focus:outline-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
//               <Bars3Icon className="h-6 w-6" />
//             </button>
//             <div className="flex-1 hidden md:block max-w-md relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Rechercher..."
//                 className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center space-x-4">
//               <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
//                 {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
//               </button>
//               <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
//                 <BellIcon className="h-6 w-6" />
//                 <span className="absolute top-0 right-0 h-3 w-3 bg-[#FD6E47] rounded-full"></span>
//               </button>
//               <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
//             </div>
//           </div>
//         </header>
//         <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
//           <MainContent />
//         </main>
//       </div>
//     </div>
//   );
// }