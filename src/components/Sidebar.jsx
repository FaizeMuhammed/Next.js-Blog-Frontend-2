'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { FaBlog, FaUsers, FaSignOutAlt, FaPlus, FaList } from 'react-icons/fa';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, MoreVertical, LogOut, Menu } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useAuthStore from "@/stores/authStore";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Sidebar({ setActiveComponent }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle Button - Only visible on mobile */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay for mobile - Only visible when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        sidebar bg-[#262626] w-16 lg:w-64 flex flex-col min-h-screen 
        transition-all duration-300 ease-in-out z-50
      `}>
        <div className="flex flex-col h-full">
          <div className="w-full flex justify-center lg:justify-start items-center lg:gap-4 pt-6 pb-4 px-4">
            <Image src="/Group.png" alt="Logo" width={40} height={40} priority className="w-8 lg:w-10" />
            <h2 className="hidden lg:block font-bold text-white">FutureTech</h2>
          </div>

          <div className="flex-grow text-white py-4">
            <ul className="space-y-2">
              <li>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full bg-transparent hover:bg-transparent rounded-none text-left flex justify-between items-center px-2 lg:px-4 py-2 hover:border-l-8 border-yellow-400 text-white hover:text-[#262626]"
                    >
                      <div className="flex items-center hover:bg-white h-full w-full p-3 lg:p-5 rounded-md space-x-2">
                        <FaBlog className="text-lg" />
                        <span className="hidden lg:inline">Blog</span>
                      </div>
                      <ChevronDown className="h-4 w-4 hidden lg:block" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-2 lg:ml-4 space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setActiveComponent('createBlog');
                        setIsSidebarOpen(false);
                      }}
                      className="w-full text-left text-white hover:text-yellow-400 border-l-2 border-transparent hover:border-yellow-400 px-2 lg:px-4 flex items-center space-x-2"
                    >
                      <FaPlus className="text-lg" />
                      <span className="hidden lg:inline">Create Blog</span>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setActiveComponent('blogList');
                        setIsSidebarOpen(false);
                      }}
                      className="w-full text-left text-white hover:text-yellow-400 border-l-2 border-transparent hover:border-yellow-400 px-2 lg:px-4 flex items-center space-x-2"
                    >
                      <FaList className="text-lg" />
                      <span className="hidden lg:inline">List Blog</span>
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              </li>
              
              <li>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setActiveComponent('userDashboard');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full bg-transparent hover:bg-transparent rounded-none text-left flex justify-between items-center px-2 lg:px-4 py-2 hover:border-l-8 border-yellow-400 text-white hover:text-[#262626]"
                >
                  <div className="flex items-center hover:bg-white h-full w-full p-3 lg:p-5 rounded-md space-x-2">
                    <FaUsers className="text-lg" />
                    <span className="hidden lg:inline">Users</span>
                  </div>
                </Button>
              </li>
            </ul>
          </div>

          {user && (
            <div className="hidden lg:block bg-yellow-400 rounded-lg p-4 m-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <div className="avatar bg-white rounded-full w-9 h-10 flex items-center justify-center text-black font-bold">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col">
                    <div className="name text-black font-semibold">
                      {user?.username || 'User Name'}
                    </div>
                    <div className="email text-black text-sm">
                      {user?.email || 'user@example.com'}
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <MoreVertical className="h-5 w-5 text-black hover:text-gray-700" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          {user && (
            <div className="lg:hidden flex justify-center p-4">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-white hover:text-red-400"
              >
                <FaSignOutAlt className="text-lg" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}