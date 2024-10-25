'use client'; 
import React,{ useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/authStore';
import Loader from '@/components/Loader'; 

const HomePage = () => {
  const router = useRouter();
  const { user, token,initializeAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

 

  useEffect(() => {
    const handleRedirect = () => {
      if (!token) {
        router.push('/login');
      } else if (user) {
        if (user.role === 'admin') {
          router.push('/dashboard');
        } else {
          router.push('/homepage');
        }
      } else {
        router.push('/login');
      }
      setIsLoading(false); 
    };
    handleRedirect();
  }, [token, user, router]);

  if (isLoading) {
    return <Loader />; // Show the loading animation while redirecting
  }

  return null; 
};

export default HomePage;
