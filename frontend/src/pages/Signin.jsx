import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../slices/userapiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import {useNavigate} from "react-router"
import Loader from "../components/Loader"


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, {isLoading}] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async(e)=>{
   e.preventDefault();
   try {
     const res = await login({email, password}).unwrap();
     dispatch(setCredentials(res.user));
     navigate("/")
   } catch (error) {
    toast.error(error?.data?.error || error?.error)
   }
  
  
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Sign In
        </h2>

        <form className="space-y-5" onSubmit={submitHandler}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
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
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' 
              onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center gap-2 text-gray-500'>
              <input type="checkbox" className='accent-green-500' />
              Remember Me
            </label>
            <a href="#" className='text-green-500 hover:underline'>Forgot Password?</a>
          </div>

          <button type='submit' 
            className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600'>
            Sign in
          </button>
          {isLoading && <Loader/> }
        </form>
 
      <p className='text-center text-gray-500 mt-6'>Don't have an account? {" "}
        <a href="/register" className='text-green-500 hover:underline'>Create a new account</a>
      </p>
      </div>
    </div>
  )
}

export default Signin