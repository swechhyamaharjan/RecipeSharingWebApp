import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../slices/userapiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router"
import Loader from "../components/Loader"
import { useSendOtpMutation, useVerifyOtpMutation, useResetPasswordMutation } from '../slices/userapiSlice'


const Signin = () => {
  //login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  //forget pass states
  const [showForget, setShowForget] = useState(false);
  const [step, setStep] = useState(1); //step1=otp 2=verify 3=reset
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //API Hooks
  const [login, { isLoading: logging }] = useLoginMutation();
  const [sendOtp, { isLoading: sending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: resetting }] = useResetPasswordMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //login
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      }
      const res = await login({ email, password, rememberMe }).unwrap();
      dispatch(setCredentials(res.user));
      if (res.user.isAdmin) {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } catch (error) {
      toast.error(error?.data?.error || error?.error)
    }
  }

  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter your email!!")
    try {
      await sendOtp({ email }).unwrap();
      toast.success("OTP sent to your email successfully!!")
      setStep(2);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send OTP");
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP sent to your mail.");
    try {
      await verifyOtp({ email, otpCode: otp }).unwrap();
      toast.success("OTP verified");
      setStep(3);
    } catch (error) {
      toast.error(error?.data?.message || "Invalid OTP");
    }
  }

  const handleResetPassword = async () => {
    if (!newPassword) return toast.error("Enter new password");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");
    
    try {
      await resetPassword({ email, newPassword }).unwrap();
      toast.success("Password reset successfully");

      // Reset all states and go back to login
      setShowForget(false);
      setStep(1);
      setOtp("");
      setNewPassword("");
      setPassword("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  const handleBackToLogin = () => {
    setShowForget(false);
    setStep(1);
    setOtp("");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          {showForget ? "Reset Password" : "Sign In"}
        </h2>

        {/* LOGIN FORM */}
        {!showForget && (
          <form className="space-y-5" onSubmit={submitHandler}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>
                Password
              </label>
              <input
                type='password'
                placeholder='Enter your password'
                value={password}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center gap-2 text-gray-500'>
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='accent-green-500' 
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() => setShowForget(true)}
                className='text-green-500 hover:underline'
              >
                Forgot Password?
              </button>
            </div>

            <button 
              type='submit'
              disabled={logging}
              className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {logging ? "Signing in..." : "Sign in"}
            </button>
            {logging && <Loader />}
          </form>
        )}

        {/* FORGOT PASSWORD FLOW */}
        {showForget && (
          <div className="space-y-4">
            {/* STEP 1: Send OTP */}
            {step === 1 && (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your email address and we'll send you an OTP to reset your password.
                </p>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSendOtp}
                  disabled={sending}
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            )}

            {/* STEP 2: Verify OTP */}
            {step === 2 && (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Enter the OTP sent to <strong>{email}</strong>
                </p>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    OTP
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  disabled={verifying}
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verifying ? "Verifying..." : "Verify OTP"}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-green-500 hover:underline"
                >
                  Resend OTP
                </button>
              </>
            )}

            {/* STEP 3: Reset Password */}
            {step === 3 && (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Create a new password for your account.
                </p>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter new password (min 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleResetPassword}
                  disabled={resetting}
                  className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resetting ? "Resetting..." : "Reset Password"}
                </button>
              </>
            )}

            <button
              onClick={handleBackToLogin}
              className="w-full text-sm text-gray-500 hover:text-gray-700 underline mt-4"
            >
              ← Back to login
            </button>
          </div>
        )}

        <p className='text-center text-gray-500 mt-6'>
          Don't have an account?{" "}
          <a href="/register" className='text-green-500 hover:underline'>
            Create a new account
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signin