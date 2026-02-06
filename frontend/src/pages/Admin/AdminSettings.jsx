import { useState } from 'react'
import { FaUser, FaLock, FaInfoCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateProfileMutation } from '../../slices/userapiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const {userInfo} = useSelector((state)=>state.auth);
  const [updateProfile] = useUpdateProfileMutation();

  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    fullname: userInfo?.fullname || "",
    email: userInfo?.email || "",
    newPassword: "",
    confirmPassword: ""
  })
  
  const handleChange = async(e)=>{
    setProfile({
      ...profile, 
      [e.target.name]: e.target.value
    });
  }

 const updateProfileHandler = async (e) => {
  e.preventDefault();

  if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }
  try {
    const res = await updateProfile({
      fullname: profile.fullname,
      email: profile.email,
      password: profile.newPassword,
    }).unwrap();

    toast.success(res.message)
    dispatch(setCredentials({ ...userInfo, ...res.user }))
  } catch (err) {
    toast.error(err?.data?.message || "Update failed");
  }
};

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-7xl mx-auto p-6 lg:p-8'>
        {/* Header */}
        <div className='mb-10'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-3'>Settings</h2>
          <p className='text-gray-600 text-sm lg:text-base'>Manage your admin profile and view system information</p>
        </div>

        {/* Tabs */}
          <div className='flex gap-2 mb-6 border-b border-gray-200'>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${activeTab === 'profile'
                ? 'text-emerald-600 border-emerald-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
          >
            <FaUser className='inline mr-2' />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${activeTab === 'system'
                ? 'text-emerald-600 border-emerald-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
          >
            <FaInfoCircle className='inline mr-2' />
            System Info
          </button>
        </div>

        {/* Tab Content */}
        <div className='space-y-6'>
          {activeTab === 'profile' && (
            <div className='space-y-6'>
              {/* Profile Info */}
              <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <FaUser className='text-emerald-600'/>
                  Profile Information
                </h3>
              
              <form className='space-y-4' onSubmit={updateProfileHandler}>
                <div>
                  <label className='block text-gray-700 font-medium mb-2'>Fullname</label>
                  <input
                      type='text'
                      name='fullname'
                      onChange={handleChange}
                      value={profile.fullname}
                      className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent' />
                </div>

                 <div>
                  <label className='block text-gray-700 font-medium mb-2'>Email</label>
                  <input
                      type='email'
                      name='email'
                      onChange={handleChange}
                      value={profile.email}
                      className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent' />
                </div>
                <button
                    type='submit'
                    className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200'
                  >
                    Update Profile
                  </button>
              </form>
              </div>

               {/* Change Password */}
              <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
                <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <FaLock className='text-emerald-600' />
                  Change Password
                </h3>
                <form className='space-y-4' onSubmit={updateProfileHandler}>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>New Password</label>
                    <input
                      type='password'
                      name='newPassword'
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>Confirm New Password</label>
                    <input
                      type='password'
                      name='confirmPassword'
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                    />
                  </div>
                  <button
                    type='submit'
                    className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200'
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
                  <FaInfoCircle className='text-emerald-600' />
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
                      <p className='text-emerald-600 font-semibold'>{userInfo?.isAdmin ? 'Administrator' : 'User'}</p>
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
  )
}

export default AdminSettings