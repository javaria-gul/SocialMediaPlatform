import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageCircle, Bell, Search, PlusCircle, Settings, User, Moon } from "lucide-react";

const SidebarLeft = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Home", icon: <Home size={20} />, path: "/" },
    { label: "Chat", icon: <MessageCircle size={20} />, path: "/chat" },
    { label: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
    { label: "Search", icon: <Search size={20} />, path: "/search" },
    { label: "Create Post", icon: <PlusCircle size={20} />, path: "/create-post" },
    { label: "Profile", icon: <User size={20} />, path: "/profile" },
    { label: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { label: "Dark Mode", icon: <Moon size={20} />, path: "/theme" },
  ];

  const handleNavigation = (path) => {
    console.log('Navigating to:', path); // Debug log
    if (path === "/theme") {
      document.documentElement.classList.toggle('dark');
      return;
    }
    navigate(path);
  };

  return (
    <div className="
      hidden md:flex 
      flex-col items-center
      py-6 
      h-[calc(100vh-30px)] 
      fixed left-2 top-4 bottom-4
      w-16 
      bg-blue-900 
      shadow-2xl 
      rounded-3xl 
      border 
      border-blue-700
    ">
      <ul className="flex flex-col items-center space-y-3 mt-2">
        {menu.map((item, index) => (
          <li
            key={index}
            className={`
              group
              w-10 h-10 
              flex items-center justify-center 
              rounded-xl 
              transition-all cursor-pointer
              ${location.pathname === item.path 
                ? 'bg-yellow-400 text-gray-900' 
                : 'text-white hover:bg-yellow-400 hover:text-gray-900'
              }
            `}
            title={item.label}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarLeft;