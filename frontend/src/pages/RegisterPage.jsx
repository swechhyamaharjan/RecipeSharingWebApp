import {useState, useEffect} from 'react'
import { useSignupMutation } from '../slices/userapiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [signup, {isLoading}] = useSignupMutation();
  const { userInfo } = useSelector((state)=>state.auth);
  const navigate = useNavigate();

  const submitHandler = async(e)=>{
     e.preventDefault();
     if (password !== confirmPass){
      toast.error("Password doesn't match")
     }
     try {
      await signup({fullname: name, email, password}).unwrap();
      toast.success("Registered successful!! Please Signin")
      navigate("/signin")
     } catch (error) {
      toast.error(error?.data?.error || error?.error) 
     }
  }

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Create an account
        </h2>

      <form className='space-y-5' onSubmit={submitHandler}>
        <div>
        <label className='block text-gray-700 font-medium mb-1'>Name</label>
        <input type='text'
         placeholder='Enter your name'
         className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
         onChange={(e)=>setName(e.target.value)}/>
         </div>
         <div>
          <label className='block text-gray-700 font-medium mb-1'>Email</label>
          <input type='email'
          placeholder='Enter your email'
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' 
          onChange={(e)=>setEmail(e.target.value)}/>
         </div>
         <div>
          <label className='block text-gray-700 font-medium mb-1'>Password</label>
          <input type="password"
          placeholder='Enter the password'
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' 
          onChange={(e)=>setPassword(e.target.value)}/>
         </div>
         <div>
          <label className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
          <input type="password"
          placeholder='Re-Enter the password'
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' 
          onChange={(e)=>setConfirmPass(e.target.value)}/>
         </div>
         <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600'>Register</button>
      </form>

      <p className='text-center text-gray-500 mt-6'>Already have an account? {" "}
        <a href="/signin" className='text-green-500 hover:underline'>Login</a>
      </p>
      </div>
    </div>
  )
}

export default RegisterPage