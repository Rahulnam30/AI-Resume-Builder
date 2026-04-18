import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from "../../api/axios";
import images from '../../assets';
import NavBar from '../../components/NavBar';
import { Toaster, toast } from 'react-hot-toast';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Invalid or missing reset token.');
      return;
    }
    if (!password) {
      toast.error('Please enter a new password.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/auth/reset-password', {
        token,
        newPassword: password,
      });
      
      toast.success(response.data.message || 'Password reset successful!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(
        error?.response?.data?.message || 'Failed to reset password. The link might be expired.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Toaster position="top-right" />
      <div className="fixed inset-x-0 top-16 bottom-0 flex items-center justify-center w-full p-4 md:p-8 lg:p-10 bg-blue-950 overflow-hidden">
        <div className="flex w-full h-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="hidden w-1/2 lg:block">
            <img
              src={images.resumeexample || '/resumeexample.jpg'}
              alt="resetpasswordpage"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full p-8 lg:w-1/2 flex flex-col justify-center">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-semibold text-center text-gray-800">
                Set New Password
              </h1>
              <p className="text-sm text-center text-gray-600 mt-2">
                Enter a strong password for your account
              </p>
              <img src={images.logo || '/logo.png'} alt="Logo" className="w-32 my-4" />
            </div>
            
            <form className="mt-4" onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white rounded-lg transition transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                }`}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
            
            <p className="mt-8 text-xs text-center text-gray-400">
              &copy; 2025 AI Resume Builder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
