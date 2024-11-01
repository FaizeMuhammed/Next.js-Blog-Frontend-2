'use client';
import { useState, useEffect } from 'react';
import Sidebar from "@/components/Sidebar";
import BlogList from "@/components/BlogList";
import CreateBlog from "@/components/CreateBlog";
import UserDashboardList from "@/components/UserDashboardList";
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/authStore';

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('blogList'); 
  const isAuthorized = useAuthStore((state) => state.isAuthorized);
  const getUserRole = useAuthStore((state) => state.getUserRole); 
  const router = useRouter();
  const {user}=useAuthStore()
  
  useEffect(() => {
    
   
    

    if (!user) {
      router.push('/login');
    } 
    
  }, [user]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'createBlog':
        return <CreateBlog />;
      case 'blogList':
        return <BlogList />;
      case 'userDashboard':
        return <UserDashboardList />;
      default:
        return <BlogList />; 
    }
  };

  return (
    
    <div className="dashboard w-full flex">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="mainSec w-full bg-[#141414]">
        {renderComponent()}
      </div>
    </div>
  );
}
