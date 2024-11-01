import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import useAuthStore from '@/stores/authStore';

// Skeleton component for loading state
const UserCardSkeleton = () => {
  return (
    <Card className="bg-[#1a1a1a] text-white border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#262626] animate-pulse mb-4" />
          <div className="h-4 w-24 bg-[#262626] animate-pulse mb-2 rounded" />
          <div className="h-3 w-16 bg-[#262626] animate-pulse rounded" />
        </div>
        <div className="flex justify-between mt-6">
          <div className="div border-r border-r-[#262626] w-1/3 ml-1 flex flex-col justify-center items-center">
            <div className="h-3 w-8 bg-[#262626] animate-pulse mb-1 rounded" />
            <div className="h-3 w-6 bg-[#262626] animate-pulse rounded" />
          </div>
          <div className="div border-r border-r-[#262626] w-1/3 ml-1 flex flex-col justify-center items-center">
            <div className="h-3 w-8 bg-[#262626] animate-pulse mb-1 rounded" />
            <div className="h-3 w-6 bg-[#262626] animate-pulse rounded" />
          </div>
          <div className="div w-1/3 ml-1 flex flex-col justify-center items-center">
            <div className="h-3 w-8 bg-[#262626] animate-pulse mb-1 rounded" />
            <div className="h-3 w-6 bg-[#262626] animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UserCard = ({ user }) => {
  if (!user) return null;

  const getInitial = (username) => {
    return username && typeof username === 'string' ? username.charAt(0).toUpperCase() : '?';
  };

  return (
    <Card className="bg-[#1a1a1a] text-white border-none shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-20 h-20 mb-4">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.username || 'User'} />
            ) : (
              <AvatarFallback className="bg-[#98989a] text-white text-2xl font-bold">
                {getInitial(user.username)}
              </AvatarFallback>
            )}
          </Avatar>
          <h3 className="text-lg font-semibold">{user.username || 'Unknown User'}</h3>
          <p className="text-sm text-gray-400">{user.role || 'No Role'}</p>
        </div>
        <div className="flex justify-between mt-6">
          <div className="div border-r border-r-[#98989a] w-1/3 ml-1 flex flex-col justify-center items-center">
            <h4 className='text-[#98989a] text-[12px]'>Like</h4>
            <h4 className='text-[#98989a] text-[12px]'>{user.likes ?? 2}</h4>
          </div>
          <div className="div border-r flex flex-col justify-center items-center border-r-[#98989a] w-1/3 ml-1">
            <h4 className='text-[#98989a] text-[12px]'>Comment</h4>
            <h4 className='text-[#98989a] text-[12px]'>{user.comments ?? 123}</h4>
          </div>
          <div className="div w-1/3 ml-1 flex flex-col justify-center items-center">
            <h4 className='text-[#98989a] text-[12px]'>Share</h4>
            <h4 className='text-[#98989a] text-[12px]'>{user.share ?? 5}</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function UserDashboardList() {
  const { users, isLoading, error, fetchUsers } = useAuthStore();
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

  const getFilteredUsers = () => {
    if (!searchQuery && selectedRole === "all" && sortOrder === "newest") {
      return users;
    }

    let filteredUsers = [...users];

    if (searchQuery) {
      filteredUsers = filteredUsers.filter(user =>
        user.username?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRole !== "all") {
      filteredUsers = filteredUsers.filter(user =>
        user.role?.toLowerCase() === selectedRole.toLowerCase()
      );
    }

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
          <Button onClick={() => { }}>Log In</Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="text-yellow-400 flex items-center bg-[#141414] justify-between p-4">
        <h1 className="font-bold text-lg sm:block hidden">Team</h1>
        <div className="relative w-full max-w-md mx-auto flex justify-end">
          <Input
            type="text"
            placeholder="Search users by name..."
            className="sm:w-full w-[80%] sm:ml-0 py-2 px-4 bg-[#262626] text-gray-200 rounded-full border-none focus:outline-none focus:ring-2 hover:border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="min-h-screen bg-[#141414] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white mr-2"></h1>
          <div className="flex space-x-4 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-[#1E1E1E] text-[#98989a] rounded-2xl border-[#98989a]">
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
                <Button variant="outline" size="sm" className="bg-[#1E1E1E] text-[#98989a] rounded-2xl border-[#98989a]">
                  {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOrder("newest")}>Newest First</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("oldest")}>Oldest First</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" className="text-white">
              <MoreVertical />
            </Button>
          </div>
        </div>

        <div className="bg-[#141414] rounded-lg p-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // Show 8 skeleton cards while loading
              [...Array(8)].map((_, index) => (
                <UserCardSkeleton key={index} />
              ))
            ) : error ? (
              <div className="text-white col-span-4 text-center py-8">Error: {error}</div>
            ) : Array.isArray(getFilteredUsers()) && getFilteredUsers().length > 0 ? (
              getFilteredUsers().map(user => (
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