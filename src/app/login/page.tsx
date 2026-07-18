'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { authAPI } from '@/lib/api';
import GoogleLoginButton from '@/components/GoogleLoginButton'; // ✅ ইম্পোর্ট নিশ্চিত করুন

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      
      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // ✅ Hard redirect ব্যবহার করুন যাতে Navbar সাথে সাথে আপডেট হয়
      window.location.href = '/explore'; 
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Requirement অনুযায়ী: Auto-fill credentials
  const handleDemoLogin = () => {
    setFormData({
      email: 'tamanna@test.com', // অথবা 'demo@rethread.com' (যদি seed script রান করে থাকেন)
      password: '123456',        // অথবা 'demo123'
    });
  };

  return (
    <div className="min-h-screen bg-oat flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-forest">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in to your ReThread account
          </p>
        </div>

        {/* Demo Login Button (Auto-fill) */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full bg-terracotta/10 hover:bg-terracotta/20 text-terracotta border border-terracotta py-2 px-4 rounded-lg font-semibold transition text-sm flex items-center justify-center gap-2"
        >
          <span>⚡</span> Auto-fill Demo Credentials
        </button>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-terracotta focus:ring-terracotta border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-terracotta hover:text-terracotta-dark transition">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-forest hover:bg-forest-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Google Login Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* ✅ আসল Google Login Component (ডামি বাটন মুছে ফেলা হয়েছে) */}
        <GoogleLoginButton />

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-terracotta hover:text-terracotta-dark transition">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}