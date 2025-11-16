import React, { useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Edit3, Camera, Save, X, User, Mail, GraduationCap, Calendar, Users, Heart, CheckCircle, XCircle } from 'lucide-react';

const Profile = () => {
  const { userData, updateUserData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userData?.name || '',
    bio: userData?.bio || '',
    username: userData?.username || '',
    semester: userData?.semester || '',
    batch: userData?.batch || '',
    subjects: userData?.subjects || [],
    avatar: userData?.avatar || '👤',
    coverImage: userData?.coverImage || ''
  });
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [usernameChangeTime, setUsernameChangeTime] = useState(userData?.lastUsernameChange || null);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [tempCover, setTempCover] = useState(null);
  
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Initialize form when userData changes
  useEffect(() => {
    if (userData) {
      setEditForm({
        name: userData.name || '',
        bio: userData.bio || '',
        username: userData.username || '',
        semester: userData.semester || '',
        batch: userData.batch || '',
        subjects: userData.subjects || [],
        avatar: userData.avatar || '👤',
        coverImage: userData.coverImage || ''
      });
    }
  }, [userData]);

  // Check if username can be changed (30 days cooldown)
  const canChangeUsername = () => {
    if (!usernameChangeTime) return true;
    const lastChange = new Date(usernameChangeTime);
    const now = new Date();
    const diffTime = Math.abs(now - lastChange);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 30;
  };

  // Check username availability
  const checkUsernameAvailability = async (username) => {
    if (username.length < 3) {
      setIsUsernameAvailable(null);
      return;
    }

    setIsCheckingUsername(true);
    // Simulate API call
    setTimeout(() => {
      const available = Math.random() > 0.3; // 70% chance available
      setIsUsernameAvailable(available);
      setIsCheckingUsername(false);
    }, 1000);
  };

  const handleUsernameChange = (username) => {
    setEditForm(prev => ({ ...prev, username }));
    if (username.length >= 3) {
      checkUsernameAvailability(username);
    } else {
      setIsUsernameAvailable(null);
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'avatar') {
          setTempAvatar(e.target.result);
        } else {
          setTempCover(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Validate username
      if (editForm.username.length < 3) {
        alert('Username must be at least 3 characters long!');
        return;
      }

      // Validate username change
      if (editForm.username !== userData.username && !canChangeUsername()) {
        alert('You can only change username once every 30 days!');
        return;
      }

      if (editForm.username !== userData.username && !isUsernameAvailable) {
        alert('Please choose an available username!');
        return;
      }

      // Update user data with temporary images
      const updatedData = {
        ...editForm,
        avatar: tempAvatar || userData.avatar,
        coverImage: tempCover || userData.coverImage,
        lastUsernameChange: editForm.username !== userData.username ? new Date().toISOString() : userData.lastUsernameChange
      };

      console.log('Updating profile:', updatedData);
      
      // Update in context (and eventually in database)
      updateUserData(updatedData);
      
      // Reset temporary images
      setTempAvatar(null);
      setTempCover(null);
      setIsEditing(false);
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: userData?.name || '',
      bio: userData?.bio || '',
      username: userData?.username || '',
      semester: userData?.semester || '',
      batch: userData?.batch || '',
      subjects: userData?.subjects || [],
      avatar: userData?.avatar || '👤',
      coverImage: userData?.coverImage || ''
    });
    setTempAvatar(null);
    setTempCover(null);
    setIsEditing(false);
    setIsUsernameAvailable(null);
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const currentAvatar = tempAvatar || userData.avatar;
  const currentCover = tempCover || userData.coverImage;
  const admirersCount = userData.admirersCount || 0;
  const bioCharsCount = editForm.bio ? editForm.bio.length : 0;
  const maxChars = 60; // Changed to 60 characters

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Cover Photo */}
          <div 
            className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative"
            style={{ 
              backgroundImage: currentCover ? `url(${currentCover})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {isEditing && (
              <button 
                onClick={() => coverInputRef.current?.click()}
                className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all backdrop-blur-sm"
              >
                <Camera size={20} />
              </button>
            )}
            <input
              type="file"
              ref={coverInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'cover')}
            />
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6 -mt-16 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Avatar - Increased size */}
              <div className="relative">
                <div 
                  className="w-32 h-32 rounded-2xl flex items-center justify-center text-white text-4xl shadow-2xl border-4 border-white bg-gradient-to-r from-blue-400 to-purple-500"
                  style={{ 
                    backgroundImage: currentAvatar && currentAvatar.startsWith('data:') ? `url(${currentAvatar})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {!currentAvatar || !currentAvatar.startsWith('data:') ? (currentAvatar || '👤') : ''}
                </div>
                {isEditing && (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition-all shadow-lg"
                  >
                    <Camera size={16} />
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'avatar')}
                />
              </div>

              {/* User Info */}
              <div className="flex-1 mt-8"> {/* Increased margin to move name down */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          className="text-2xl font-bold bg-gray-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                          placeholder="Enter your name"
                          maxLength={50}
                        />
                        
                        <div className="flex items-center gap-4">
                          <div className="relative flex-1">
                            <input
                              type="text"
                              value={editForm.username}
                              onChange={(e) => handleUsernameChange(e.target.value)}
                              disabled={!canChangeUsername()}
                              className="text-lg bg-gray-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full disabled:bg-gray-200 disabled:cursor-not-allowed"
                              placeholder="Username (min 3 characters)"
                              maxLength={30}
                            />
                            {isCheckingUsername && (
                              <div className="absolute right-3 top-3 animate-spin">⟳</div>
                            )}
                            {!isCheckingUsername && isUsernameAvailable && editForm.username.length >= 3 && (
                              <CheckCircle className="absolute right-3 top-3 text-green-500" size={20} />
                            )}
                            {!isCheckingUsername && isUsernameAvailable === false && (
                              <XCircle className="absolute right-3 top-3 text-red-500" size={20} />
                            )}
                          </div>

                          {/* Edit Button moved next to username */}
                          {!isEditing && (
                            <button
                              onClick={() => setIsEditing(true)}
                              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-all whitespace-nowrap"
                            >
                              <Edit3 size={18} />
                              Edit Profile
                            </button>
                          )}
                        </div>
                        
                        {editForm.username.length > 0 && editForm.username.length < 3 && (
                          <p className="text-sm text-red-600">
                            Username must be at least 3 characters
                          </p>
                        )}
                        
                        {!canChangeUsername() && (
                          <p className="text-sm text-orange-600">
                            ⚠️ Username can be changed once every 30 days
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-800">
                          {userData.name || 'Your Name'}
                        </h1>
                        <div className="flex items-center gap-4">
                          <p className="text-lg text-gray-500">
                            @{userData.username || 'username'}
                          </p>
                          {/* Edit Button next to username */}
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-all whitespace-nowrap"
                          >
                            <Edit3 size={18} />
                            Edit Profile
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                  {isEditing ? (
                    <div>
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        placeholder="Tell us about yourself... (max 60 characters)"
                        rows="2"
                        maxLength={maxChars}
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{bioCharsCount}/{maxChars} characters</span>
                        <span>{maxChars - bioCharsCount} remaining</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 whitespace-pre-wrap break-words">
                      {userData.bio || 'No bio yet. Tell us about yourself!'}
                    </p>
                  )}
                </div>

                {/* Save/Cancel Buttons when editing */}
                {isEditing && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Social Stats - NO EDIT BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="text-red-500" size={20} fill="currentColor" />
              Social Stats
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <p className="text-2xl font-bold text-red-600">{admirersCount}</p>
                <p className="text-sm text-gray-600">Admirers</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">{userData.following?.length || 0}</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <p className="text-2xl font-bold text-purple-600">0</p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
            </div>
          </motion.div>

          {/* Academic Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <GraduationCap className="text-blue-500" size={20} />
              Academic Information
            </h2>
            
            <div className="space-y-4">
              {/* Role - Not Editable */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">{userData.role || 'Not set'}</p>
              </div>

              {userData.role === 'student' && (
                <>
                  {isEditing ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Semester</p>
                        <select
                          value={editForm.semester}
                          onChange={(e) => setEditForm(prev => ({ ...prev, semester: e.target.value }))}
                          className="w-full bg-gray-100 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select Semester</option>
                          {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map(sem => (
                            <option key={sem} value={sem}>{sem}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Batch</p>
                        <select
                          value={editForm.batch}
                          onChange={(e) => setEditForm(prev => ({ ...prev, batch: e.target.value }))}
                          className="w-full bg-gray-100 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select Batch</option>
                          {['2020', '2021', '2022', '2023', '2024', '2025'].map(batch => (
                            <option key={batch} value={batch}>{batch}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Semester</p>
                        <p className="text-lg font-semibold text-gray-800">{userData.semester || 'Not set'}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Batch</p>
                        <p className="text-lg font-semibold text-gray-800">{userData.batch || 'Not set'}</p>
                      </div>
                    </>
                  )}
                </>
              )}

              {userData.role === 'faculty' && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Subjects</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.subjects.join(', ')}
                      onChange={(e) => setEditForm(prev => ({ ...prev, subjects: e.target.value.split(', ') }))}
                      className="w-full bg-gray-100 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter subjects separated by comma"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-800">
                      {userData.subjects?.length > 0 ? userData.subjects.join(', ') : 'No subjects set'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Personal Information - NOT EDITABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mt-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="text-purple-500" size={20} />
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-800">{userData.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(userData.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Image Preview when Editing */}
        <AnimatePresence>
          {(tempAvatar || tempCover) && isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl"
            >
              <p className="text-blue-700 text-center font-medium">
                📸 Image preview visible! Click "Save" to apply changes.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;