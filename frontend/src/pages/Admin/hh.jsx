import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaLock, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminSettings = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({
    fullname: userInfo?.fullname || '',
    email: userInfo?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real implementation, you would call an API to update the profile
    toast.success('Profile update functionality would be implemented here');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    // In a real implementation, you would call an API to update the password
    toast.success('Password update functionality would be implemented here');
    setProfileData({
      ...profileData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>Settings</h2>
          <p className='text-gray-600'>Manage your admin profile and view system information</p>
        </div>

        {/* Tabs */}
        <div className='flex gap-2 mb-6 border-b border-gray-200'>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${activeTab === 'profile'
                ? 'text-green-600 border-green-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
          >
            <FaUser className='inline mr-2' />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${activeTab === 'system'
                ? 'text-green-600 border-green-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
          >
            <FaInfoCircle className='inline mr-2' />
            System Info
          </button>
        </div>

        {/* Tab Content */}
        <div className='space-y-6'>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className='space-y-6'>
              {/* Profile Information */}
              <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <FaUser className='text-green-600' />
                  Profile Information
                </h3>
                <form onSubmit={handleProfileUpdate} className='space-y-4'>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>Full Name</label>
                    <input
                      type='text'
                      name='fullname'
                      value={profileData.fullname}
                      onChange={handleProfileChange}
                      className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>Email Address</label>
                    <input
                      type='email'
                      name='email'
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    />
                  </div>
                  <button
                    type='submit'
                    className='bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200'
                  >
                    Update Profile
                  </button>
                </form>
              </div>

              {/* Change Password */}
              <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <FaLock className='text-green-600' />
                  Change Password
                </h3>
                <form onSubmit={handlePasswordUpdate} className='space-y-4'>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>Current Password</label>
                    <input
                      type='password'
                      name='currentPassword'
                      value={profileData.currentPassword}
                      onChange={handleProfileChange}
                      className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>New Password</label>
                    <input
                      type='password'
                      name='newPassword'
                      value={profileData.newPassword}
                      onChange={handleProfileChange}
                      className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>Confirm New Password</label>
                    <input
                      type='password'
                      name='confirmPassword'
                      value={profileData.confirmPassword}
                      onChange={handleProfileChange}
                      className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    />
                  </div>
                  <button
                    type='submit'
                    className='bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200'
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* System Info Tab */}
          {activeTab === 'system' && (
            <div className='space-y-6'>
              <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <FaInfoCircle className='text-green-600' />
                  Application Information
                </h3>
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                      <p className='text-gray-600 text-sm mb-1'>Application Name</p>
                      <p className='text-gray-900 font-semibold'>RecipeHub</p>
                    </div>
                    <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                      <p className='text-gray-600 text-sm mb-1'>Version</p>
                      <p className='text-gray-900 font-semibold'>1.0.0</p>
                    </div>
                    <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                      <p className='text-gray-600 text-sm mb-1'>Environment</p>
                      <p className='text-gray-900 font-semibold'>Production</p>
                    </div>
                    <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                      <p className='text-gray-600 text-sm mb-1'>Admin Role</p>
                      <p className='text-green-600 font-semibold'>{userInfo?.isAdmin ? 'Administrator' : 'User'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>Tech Stack</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-gray-600 text-sm mb-1'>Frontend</p>
                    <p className='text-gray-900 font-semibold'>React + Vite + TailwindCSS</p>
                  </div>
                  <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-gray-600 text-sm mb-1'>Backend</p>
                    <p className='text-gray-900 font-semibold'>Node.js + Express + MongoDB</p>
                  </div>
                  <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-gray-600 text-sm mb-1'>State Management</p>
                    <p className='text-gray-900 font-semibold'>Redux Toolkit (RTK Query)</p>
                  </div>
                  <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-gray-600 text-sm mb-1'>Image Storage</p>
                    <p className='text-gray-900 font-semibold'>Cloudinary</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;