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
  const authorizeDashboardAccess = useAuthStore((state) => state.authorizeDashboardAccess);
  const getUserRole = useAuthStore((state) => state.getUserRole); // Get user role
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authorized, otherwise redirect to login
    const isAuthorized = authorizeDashboardAccess();
    const userRole = getUserRole(); // Get the user's role

    if (!isAuthorized) {
      router.push('/login');
    } else if (userRole !== 'admin') { // Check if the user is not an admin
      router.push('/homepage'); // Redirect non-admins to homepage
    }
  }, [authorizeDashboardAccess, getUserRole, router]);

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
