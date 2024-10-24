import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import useAuthStore from '@/stores/authStore';

const UserCard = ({ user }) => {
  if (!user) return null;

  const getInitial = (username) => {
    return username && typeof username === 'string' ? username.charAt(0).toUpperCase() : '?';
  };

  return (
    <Card className="bg-[#2B2B2B] text-white border-none shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-20 h-20 mb-4">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.username || 'User'} />
            ) : (
              <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">
                {getInitial(user.username)}
              </AvatarFallback>
            )}
          </Avatar>
          <h3 className="text-lg font-semibold">{user.username || 'Unknown User'}</h3>
          <p className="text-sm text-gray-400">{user.role || 'No Role'}</p>
        </div>
        <div className="flex justify-between mt-6">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ThumbsUp className="mr-2 h-4 w-4" />
            {user.likes ?? 0}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MessageSquare className="mr-2 h-4 w-4" />
            {user.comments ?? 0}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Share2 className="mr-2 h-4 w-4" />
            {user.shares ?? 0}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function UserDashboardList() {
  const { users, isLoading, error, fetchUsers } = useAuthStore();
  console.log('users',users);
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUsers();
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    };
    fetchData();
  }, [fetchUsers]);

  // Filter users based on search query and selected role
  const getFilteredUsers = () => {
    if (!searchQuery && selectedRole === "all" && sortOrder === "newest") {
      return users; // Return all users if no filters are applied
    }

    let filteredUsers = [...users];

    // Apply search filter
    if (searchQuery) {
      filteredUsers = filteredUsers.filter(user => 
        user.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply role filter
    if (selectedRole !== "all") {
      filteredUsers = filteredUsers.filter(user => 
        user.role?.toLowerCase() === selectedRole.toLowerCase()
      );
    }

    // Apply sorting
    if (sortOrder === "newest") {
      filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "oldest") {
      filteredUsers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filteredUsers;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#121212] p-6 flex items-center justify-center">
        <Card className="bg-[#1E1E1E] text-white p-6">
          <h2 className="text-xl mb-4">Authentication Required</h2>
          <p className="mb-4">Please log in to view the user dashboard.</p>
          <Button onClick={() => {}}>Log In</Button>
        </Card>
      </div>
    );
  }

  if (isLoading) return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="text-red-500 text-xl">Error: {error}</div>
    </div>
  );

  const filteredUsers = getFilteredUsers();

  return (
    <>
      <div className="text-yellow-400 flex items-center justify-between p-4">
        <h1 className="font-bold text-lg">List Blogs</h1>
        <div className="relative w-full max-w-md mx-auto">
          <Input 
            type="text" 
            placeholder="Search users by name..." 
            className="w-full py-2 px-4 bg-[#262626] text-gray-200 rounded-full border-none focus:outline-none focus:ring-2 hover:border-none" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="min-h-screen bg-[#121212] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Users Dashboard</h1>
          <div className="flex space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-[#1E1E1E] text-white">
                  {selectedRole === "all" ? "All Users" : 
                   selectedRole === "admin" ? "Admin Users" : "Regular Users"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedRole("all")}>All Users</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedRole("admin")}>Admin Users</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedRole("user")}>Regular Users</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-[#1E1E1E] text-white">
                  {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOrder("newest")}>Newest First</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("oldest")}>Oldest First</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="text-white">
              <MoreVertical />
            </Button>
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserCard key={user.id || Math.random()} user={user} />
              ))
            ) : (
              <div className="text-white col-span-4 text-center py-8">No users found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}