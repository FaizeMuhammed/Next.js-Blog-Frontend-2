import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BlogCard = ({ post, index, totalPosts }) => {
  if (!post) return null;

  return (
    <div className="relative p-10 hover:p-6">
      <Card className="bg-[#141414] border-none rounded-lg overflow-hidden group cursor-pointer">
        <div className="relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-[#141414] text-xs text-zinc-400 px-2 py-1 rounded">
            2:30 min
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium text-white mb-2 group-hover:text-zinc-300 transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-2">{post.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

const BlogListing = () => {
  const featuredBlogs = [
    {
      title: "Mars Exploration: Unveiling Alien Landscapes",
      description: "Embark on a journey through the Red Planets breathtaking landscapes and uncover the mysteries of Mars.",
      image: "/img1.png"
    },
    {
      title: "Blockchain Explained: A Revolution in Finance",
      description: "Delve into the world of blockchain technology and its transformative impact on the financial industry.",
      image: "/img2.png"
    },
    {
      title: "Breaking the Silence: Mental Health Awareness in the Workplace",
      description: "An exploration of the importance of mental health awareness and the initiatives reshaping workplaces for employee well-being.",
      image: "/img3.png"
    },
    {
      title: "Revolutionizing Investment Strategies",
      description: "An in-depth look at global efforts to conserve biodiversity and safeguard endangered species from extinction.",
      image: "/img4.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#141414] container">
      {/* Top Border */}
      
      
      <div className=" mx-auto    py-12">
        {/* Header Section */}
       
        
        {/* Blog Grid with Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Vertical Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -mx-4" />
          
          {/* Horizontal Divider */}
          <div className="md:col-span-2 h-px bg-zinc-800 absolute left-0 right-0" style={{ top: '50%' }} />
          
          {featuredBlogs.map((blog, index) => (
            <BlogCard 
              key={index} 
              post={blog}
              index={index}
              totalPosts={featuredBlogs.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListing;