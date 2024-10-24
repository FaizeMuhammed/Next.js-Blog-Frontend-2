import React from 'react';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

const Topbar = () => {
  return (
    <div className=" text-yellow-400 flex items-center justify-between p-4">
      <h1 className="font-bold text-lg">List Blogs</h1>
      <div className="relative w-full max-w-md mx-auto">
      <Input 
        type="text" 
        placeholder="Search anything here..." 
        className="w-full py-2 px-4 bg-[#262626] text-gray-200 rounded-full border-none focus:outline-none focus:ring-2 hover:border-none " 
      />
      <Search className="absolute right-3 top-2 w-5 h-5 text-gray-400" />
    </div>
    </div>
  );
};

export default Topbar;
