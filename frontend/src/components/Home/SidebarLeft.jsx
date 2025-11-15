// src/components/Home/SidebarLeft.jsx
import React from "react";
import { Home, MessageCircle, Bell, Search, PlusCircle, Settings, User, Moon } from "lucide-react";

const SidebarLeft = () => {
  const menu = [
    { label: "Home", icon: <Home size={20} />, path: "/" },
    { label: "Chat", icon: <MessageCircle size={20} />, path: "/chat" },
    { label: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
    { label: "Search", icon: <Search size={20} />, path: "/search" },
    { label: "Create Post", icon: <PlusCircle size={20} />, path: "C:\Users\ICT\TRENDZZ\frontend\src\components\Home\CreatePost.jsx" },
    { label: "Profile", icon: <User size={20} />, path: "/profile" },
    { label: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { label: "Dark Mode", icon: <Moon size={20} />, path: "/theme" },
  ];

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
      {/* All menu items in one list */}
      <ul className="flex flex-col items-center space-y-3 mt-2">
        {menu.map((item, index) => (
          <li
            key={index}
            className="
              group
              w-10 h-10 
              flex items-center justify-center 
              rounded-xl 
              hover:bg-yellow-400
              transition-all cursor-pointer
              text-white
            "
            title={item.label}
          >
            {/* White icon without background */}
            <div className="text-white group-hover:text-gray-900 transition-colors">
              {item.icon}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarLeft;