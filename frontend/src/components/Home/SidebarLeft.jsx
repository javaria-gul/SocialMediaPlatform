// src/components/Home/SidebarLeft.jsx
import React from "react";
import { Home, MessageCircle, Bell, Sun, Search, PlusCircle, Settings, User, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SidebarLeft = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Home size={22} />, label: "Home", path: "/" },
    { icon: <MessageCircle size={22} />, label: "Chat", path: "/chat" },
    { icon: <Bell size={22} />, label: "Notifications", path: "/notifications" },
    { icon: <Search size={22} />, label: "Search", path: "/search" },
    { icon: <PlusCircle size={22} />, label: "Create Post", path: "/create-post" },
    { icon: <Bookmark size={22} />, label: "My Posts", path: "/my-posts" },
    { icon: <User size={22} />, label: "Profile", path: "/profile" },
    { icon: <Settings size={22} />, label: "Settings", path: "/settings" },
    { icon: <Sun size={22} />, label: "Dark Mode", path: "/theme" },
  ];

  return (
    <div className="flex flex-col items-center space-y-6 mt-4">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.path)}
          className="relative group cursor-pointer"
        >
          {/* Icon Button */}
          <div className="p-3 bg-gray-200 hover:bg-blue-500 hover:text-white rounded-full shadow transition-all duration-300">
            {item.icon}
          </div>

          {/* Hover Label */}
          <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SidebarLeft;
