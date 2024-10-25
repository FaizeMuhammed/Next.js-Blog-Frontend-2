'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/authStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader } from 'lucide-react'; 
import { useEffect } from 'react';


const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin']),
});

export default function Register() {
  const setUser = useAuthStore((state) => state.setUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setLoading = useAuthStore((state) => state.setLoading);
  const isAuthorized = useAuthStore((state) => state.isAuthorized);
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
      router.push('/dashboard'); 
    }
  }, [isAuthorized, router]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useMutation({
    mutationFn: (data) =>{
      setLoading(true); 
       return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, data, {
        withCredentials: true, 
      })},
    onSuccess: (response) => {
     
      const { user } = response.data;
      setUser({ user });
      setLoading(false);

      if (user.role === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/homepage');
      }
    },
    onError: (error) => {
      alert('Signup failed: ' + (error.response?.data?.message || 'Something went wrong'));
      setLoading(false); 
    },
  });

  const onSubmit = (data) => {
    
    signupMutation.mutate(data);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Logo Header */}
      <div className="logoheader p-10 border-b border-[#262626] flex items-center gap-2 text-white font-bold">
        <img src="/Group.png" alt="FutureTech" className="h-8" />
        <h1>Future Tech</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-88px)]">
        {/* Left Side - Welcome Text */}
        <div className="w-full lg:w-[40%] p-6 lg:p-12 lg:border-r border-[#262626]">
          <div className="mb-8 lg:mb-0">
            <div className="flex gap-2 mb-6">
              <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
              <div className="w-4 h-4 rounded-full bg-gray-600"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            </div>
            <h1 className="text-white text-3xl lg:text-5xl font-medium mb-2">Welcome,</h1>
            <h2 className="text-white text-3xl lg:text-5xl font-medium mb-1">Create an Account</h2>
            <h2 className="text-white text-3xl lg:text-5xl font-medium">To Get Started</h2>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-[60%] p-6 lg:p-12">
          <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-white mb-2">Username</label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  className="w-full bg-[#262626] border-[#1a1a1a] text-white"
                  {...register('username')}
                />
                {errors.username && <p className="text-red-500 mt-1 text-sm">{errors.username.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-[#262626] border-[#1a1a1a] text-white"
                  {...register('email')}
                />
                {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-white mb-2">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-[#262626] border-[#1a1a1a] text-white"
                  {...register('password')}
                />
                {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
              </div>

              <div>
                <label htmlFor="role" className="block text-white mb-2">Role</label>
                <select 
                  {...register('role')} 
                  id="role" 
                  className="w-full px-4 py-2 bg-[#262626] border-[#1a1a1a] text-white rounded focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && <p className="text-red-500 mt-1 text-sm">{errors.role.message}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" className="border-[#262626]" />
                <label htmlFor="terms" className="text-white text-sm">
                  I agree with Terms of Use and Privacy Policy
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold flex justify-center items-center"
                disabled={isLoading || signupMutation.isLoading} // Disable button if loading
              >
                {isLoading || signupMutation.isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                      ></path>
                    </svg>
                    <span>Loading...</span>
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="text-center space-y-2">
                <div className="text-gray-500">or</div>
                <div className="text-gray-500 text-sm">
                  Already have an account?{' '}
                  <a href="#" onClick={handleLoginClick} className="text-yellow-400 hover:underline">
                    Login Here
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}