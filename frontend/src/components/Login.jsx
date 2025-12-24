import React,{useEffect, useState} from "react";
import axios from "axios"
export default function Login(){
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const [error,setError]=useState(null);
  // const [loading,setLoading]=useState(false);
  const handleEmail=(event)=>{
    setEmail(event.target.value)
  }
  const handlePass=(event)=>{
    setPassword(event.target.value)
  }
  useEffect(()=>{
    const handleLogin=async()=>{
    try {
      const response = await axios.post('/api/login')
      const data=response.json()
      console.log(data)
    } catch (error) {
      setError(error);
    }
  }
  handleLogin();
  },[])
  console.log(email,password)
  return (
    <div className="h-[90vh] w-full flex items-center justify-center bg-neutral-50 rounded-3xl shadow-2xs overflow-hidden">
      <div className="w-1/2 h-full overflow-hidden flex items-center justify-center">
        <div className="w-full h-full rotate-6 scale-125">
          <img
            src="/loginpage.png"
            alt="loginpage"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-1/2 h-full flex flex-col items-center justify-center bg-slate-100 rounded-l-3xl px-20">
        <h1 className="font-semibold text-center text-gray-800">
          Welcome to <span className="text-xl font-bold ">AI Resume Builder</span>
        </h1>
        <p className="text-sm text-center text-gray-600">by</p>
        <img src="/logo.png" alt="Logo" className="w-50 mx-auto mb-2" />
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form className="space-y-5 w-full max-w-md">
          <div>
            <label className="block text-sm text-left font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div>
            <label className="block text-sm text-left font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={handlePass}
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          {error&&
            <div className="text-red-600 my-3">
              Something Error:{error.message || "login failed"} 
            </div>
          }
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Sign in
          </button>
        </form>
        <div className="flex items-center my-6 w-full max-w-md">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-xs uppercase tracking-widest text-gray-400">
            or
          </span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="flex bg-gray-100 items-center justify-center space-x-2 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 mb-6 w-full max-w-md">
          <img className="w-6 h-6" src="/google.png" alt="google" />
          <span className="ml-2">Sign in with Google</span>
        </div>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
