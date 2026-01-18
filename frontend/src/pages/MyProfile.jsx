import { useSelector, useDispatch } from "react-redux"
import { useUpdateProfileMutation } from "../slices/userapiSlice";
import { setCredentials } from "../slices/authSlice";
import { FaEdit } from "react-icons/fa"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setFullname(userInfo.fullname),
      setEmail(userInfo.email)
  }, [userInfo.fullname, userInfo.email])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Password doesn't match!!!")
        return;
      }
      const res = await updateProfile({ fullname, email, password }).unwrap();
      toast.success(res.message)
      dispatch(setCredentials({ ...userInfo, ...res.user }))

    } catch (error) {
      toast.error(error?.data?.error || "Failed to update profile")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Profile Settings</h2>
          <p className="text-gray-500 mt-2 text-sm">Manage your account information</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                disabled={!edit}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2 font-medium">Email Address</label>
              <input type="email"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!edit}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2 font-medium">New Password</label>
              <input type="password"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!edit}
                placeholder="Leave blank to keep current"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2 font-medium">Confirm Password</label>
              <input type="password"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={!edit}
                placeholder="Leave blank to keep current"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            <button type="button"
              disabled={edit}
              onClick={() => setEdit(true)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
              ${edit
                  ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200 hover:shadow-sm"
                }`}
            >
              <FaEdit className="text-base" /> 
              <span>Edit</span>
            </button>

            <button type="button"
              disabled={!edit || isLoading}
              onClick={handleSubmit}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200
              ${!edit || isLoading
                  ? "bg-green-300 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md"
                }`}
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MyProfile