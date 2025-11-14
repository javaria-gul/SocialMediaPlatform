// src/components/Home/SidebarRight.jsx
import React from "react";
import { UserPlus, Users } from "lucide-react";

const SidebarRight = () => {
  const suggestions = [
    { name: "Ayesha Khan", username: "@ayesha" },
    { name: "Ali Raza", username: "@ali" },
    { name: "Sara Ahmed", username: "@sara" },
  ];

  const followers = [
    { name: "Hassan Malik", username: "@hassan" },
    { name: "Fatima Noor", username: "@fatima" },
  ];

  const following = [
    { name: "Usman Tariq", username: "@usman" },
    { name: "Maryam Zafar", username: "@maryam" },
  ];

  return (
    <div className="h-screen overflow-y-auto scrollbar-thin hidden md:flex flex-col space-y-5 p-4 bg-gray-50 rounded-2xl shadow-md">
      
      {/* Suggestions */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center gap-2 mb-3">
          <UserPlus size={18} className="text-blue-500" />
          <h2 className="font-semibold text-gray-800 text-sm">Suggestions</h2>
        </div>
        <ul className="space-y-2">
          {suggestions.map((user, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.username}</p>
              </div>
              <button className="text-xs bg-blue-500 text-white rounded-full px-3 py-1 hover:bg-blue-600 transition">
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Followers */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users size={18} className="text-green-500" />
          <h2 className="font-semibold text-gray-800 text-sm">Followers</h2>
        </div>
        <ul className="space-y-2">
          {followers.map((user, index) => (
            <li key={index}>
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.username}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Following */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users size={18} className="text-purple-500" />
          <h2 className="font-semibold text-gray-800 text-sm">Following</h2>
        </div>
        <ul className="space-y-2">
          {following.map((user, index) => (
            <li key={index}>
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.username}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarRight;
