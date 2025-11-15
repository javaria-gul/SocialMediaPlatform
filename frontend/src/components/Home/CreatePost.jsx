// components/Home/CreatePost.jsx
import React, { useState } from "react";
import { X, Image, Video, Send, Save } from "lucide-react";

const CreatePost = ({ isOpen, onClose }) => {
  const [postText, setPostText] = useState("");
  const [media, setMedia] = useState(null);
  const [mentions, setMentions] = useState([]);
  const [isDraft, setIsDraft] = useState(false);

  // Rest of the component...
};
return (
  <>
    {isOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 p-6 shadow-2xl">
          
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Create Post</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* USER INFO */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
            <div>
              <p className="font-semibold text-gray-800">User Name</p>
              <p className="text-sm text-gray-500">@username</p>
            </div>
          </div>

          {/* TEXT AREA */}
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind? Share anything... 📝"
            className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* MENTIONS SUGGESTION */}
          <div className="mt-2">
            {/* Mentions dropdown will appear when @ is typed */}
          </div>

          {/* MEDIA PREVIEW */}
          {media && (
            <div className="mt-4 relative">
              <img src={URL.createObjectURL(media)} alt="Post media" className="rounded-xl max-h-60 w-full object-cover" />
              <button onClick={() => setMedia(null)} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full">
                <X size={16} />
              </button>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center mt-6">
            
            {/* MEDIA UPLOAD BUTTONS */}
            <div className="flex gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition">
                <Image size={18} className="text-green-500" />
                <span className="text-sm">Image</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition">
                <Video size={18} className="text-purple-500" />
                <span className="text-sm">Video</span>
                <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
              </label>
            </div>

            {/* POST/DRAFT BUTTONS */}
            <div className="flex gap-2">
              <button 
                onClick={saveAsDraft}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition"
              >
                <Save size={18} />
                Save Draft
              </button>
              
              <button 
                onClick={publishPost}
                disabled={!postText.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                <Send size={18} />
                Post Now
              </button>
            </div>
          </div>

        </div>
      </div>
    )}
  </>
);