'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation';  // Changed from 'next/router'
import { FaBlog, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useAuthStore from "@/stores/authStore";

export default function Sidebar({ setActiveComponent }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="sidebar bg-[#262626] lg:w-64 w-20 flex flex-col min-h-screen">
      <div className="flex flex-col h-full">
        <div className="logo w-full flex justify-center items-center gap-4 pt-6 pb-4">
          <Image src="/Group.png" alt="Logo" width={40} height={40} priority />
          <h2 className="hidden lg:block font-bold text-white">FutureTech</h2>
        </div>
        <div className="flex-grow text-white py-4">
          <ul className="space-y-2">
            <li>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full text-left flex justify-between items-center px-4 py-2 text-white hover:text-yellow-400"
                  >
                    <div className="flex items-center space-x-2">
                      <FaBlog />
                      <span className="hidden lg:inline">Blog</span>
                    </div>
                    <ChevronDown className="h-4 w-4 hidden lg:block" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => setActiveComponent('createBlog')}
                    className="w-full text-left text-white hover:text-yellow-400 border-l-2 border-transparent hover:border-yellow-400 pl-4"
                  >
                    <span className="hidden lg:inline">Create Blog</span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveComponent('blogList')}
                    className="w-full text-left text-white hover:text-yellow-400 border-l-2 border-transparent hover:border-yellow-400 pl-4"
                  >
                    <span className="hidden lg:inline">List Blog</span>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </li>
            
            <li>
              <Button
                variant="ghost"
                onClick={() => setActiveComponent('userDashboard')}
                className="w-full flex items-center space-x-2 text-white hover:text-yellow-400 border-l-2 border-transparent hover:border-yellow-400 px-4 py-2"
              >
                <FaUsers />
                <span className="hidden lg:inline">Users</span>
              </Button>
            </li>
          </ul>
        </div>
        {user && (
          <div className="user-info mt-auto border-t border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="avatar bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center text-black font-bold">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="user-details hidden lg:block">
                <div className="name text-white font-semibold">{user.name || 'User Name'}</div>
                <div className="email text-gray-400 text-sm">{user.email || 'user@example.com'}</div>
              </div>
            </div>
          </div>
        )}
        {user && (
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="mt-2 w-full flex items-center space-x-2 text-white hover:text-red-400 border-l-2 border-transparent hover:border-red-400 px-4 py-2"
          >
            <FaSignOutAlt />
            <span className="hidden lg:inline">Logout</span>
          </Button>
        )}
      </div>
    </div>
  );
} 