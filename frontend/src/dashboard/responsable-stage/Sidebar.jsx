import { 
    BriefcaseIcon, 
    ArrowLeftOnRectangleIcon 
  } from "@heroicons/react/24/outline";
  
  export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    return (
      <div className={`w-16 md:w-56 h-screen bg-[#0927EB] flex flex-col transition-all duration-300 border-r border-gray-200 fixed lg:static z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 flex justify-center items-center h-24 border-opacity-20">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center overflow-hidden">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
              <div className="h-5 w-5 rounded-full bg-[#FD6E47] flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-[#16A637]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 border-b border-white"></div>
  
        <nav className="flex-1 flex flex-col items-center md:items-start px-2 space-y-1 mt-5 overflow-y-auto">
          <SidebarItem
            icon={<BriefcaseIcon className="h-5 w-5 md:h-6 md:w-6" />}
            text="Offres de stage"
            active={true}
            onClick={() => {}}
          />
          <div className="pt-4 mt-4 border-t border-white/30 w-full flex justify-center md:justify-start">
            <SidebarItem
              icon={<ArrowLeftOnRectangleIcon className="h-5 w-5 md:h-6 md:w-6" />}
              text="Déconnexion"
              onClick={() => console.log("Déconnexion")}
            />
          </div>
        </nav>
      </div>
    );
  }
  
  function SidebarItem({ icon, text, active, onClick }) {
    return (
      <button
        className={`
          flex items-center w-full p-2 md:p-3 rounded-full transition-all duration-200
          ${
            active
              ? "bg-white text-black md:rounded-r-none md:pr-6 relative after:absolute after:-right-4 after:top-0 after:w-4 after:h-full after:bg-[#0927EB] after:rounded-tr-full after:rounded-br-full"
              : "text-white hover:bg-white hover:bg-opacity-20"
          }
        `}
        onClick={onClick}
      >
        <span className="mx-auto md:mx-0 md:mr-3">{icon}</span>
        <span className="hidden md:inline font-medium text-sm">{text}</span>
      </button>
    );
  }