'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart,  Send, ArrowUpRight } from "lucide-react";
import useBlogStore from '@/stores/blogStore';
import { useRouter } from 'next/navigation';


const safeString = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object' && value._id) return value._id.toString();
  return String(value);
};


const safeNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};
const getCategoryImage = (category) => {
  switch (category) {
    case 'food':
      return '/Food.jpg';
    case 'technology':
      return '/Technology.webp';
    case 'travel':
      return '/Travel.jpg';
    default:
      return '/api/placeholder/400/300'; 
  }
};

const formatDate=(dateString)=> {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const FeaturedBlogPostCard = ({ post }) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false); 

  if (!post || typeof post !== 'object') {
    console.error('Invalid post data received:', post);
    return null;
  }

  return (
    <Card className="bg-[#141414] text-white overflow-hidden border-none pt-10">
      <div className="flex w-full flex-col md:flex-row">
        <div className="md:w-1/2 px-2">
          <img
            src={getCategoryImage(post.category)}
            alt={safeString(post.title)}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <CardTitle className="text-2xl mb-2">{safeString(post.title) || 'Untitled'}</CardTitle>
            <p className="text-zinc-400 mb-4">{safeString(post.paragraphs[0].content) || 'No description available'}</p>
            <div className="cattags flex justify-start gap-5">
              <div className="items-center mb-4">
                <p className="text-[18px] text-[#98989A]">Category</p>
                <h1 className="text-[18px] text-[#fff]">{safeString(post.category) || 'Uncategorized'}</h1>
              </div>
              <div>
                <h1 className="text-[18px] text-[#98989A]">Published</h1>
                <p className="text-[18px] text-[#fff]">{formatDate(post.publishingDate) || 'Date not available'}</p>
              </div>
              <div>
                <h1 className="text-[18px] text-[#98989A]">Author</h1>
                <p className="text-[18px] text-[#fff]">
                  {safeString(post.authorName) || 'Anonymous'}
                </p>
              </div>
            </div>
          </div>
          <CardFooter className="px-0 pt-4">
            <div className="flex items-center space-x-4 text-zinc-400">
              <button
                className={`bg-[#1a1a1a] flex border border-[#262626] p-2 rounded-2xl items-center ${liked ? 'text-red-500' : 'text-[#666666] '}`}
                onClick={() => setLiked(!liked)}
              >
                <Heart size={16} className="mr-1" fill={liked ? 'red' : 'none'} /> {safeNumber(post.likes)}
              </button>
              <button className="bg-[#1a1a1a] flex items-center text-[#666666]  border border-[#262626] p-2 rounded-2xl">
                <Send size={16} className="mr-1" /> 3
              </button>
            </div>
            <button
              className="ml-auto text-[#666666] hover:underline border border-[#262626] p-3 rounded-md"
              onClick={() => router.push(`/homepage/${post._id}`)}
            >
              Read More
            </button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};


// Component for the smaller blog post cards
const BlogPostCard = ({ post }) => {
  const [liked, setLiked] = useState(false); 
  const router = useRouter();

  if (!post || typeof post !== 'object') {
    console.error('Invalid post data received:', post);
    return null;
  }

  return (
    <Card className="bg-[#141414] border-none text-white overflow-hidden sm:px-0 px-3">
      <img
        src={getCategoryImage(post.category)}
        alt={safeString(post.title)}
        className="w-full h-40 object-cover rounded-lg"
      />
      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2 text-zinc-400">
          {safeString(post.category) || 'Uncategorized'}
        </Badge>
        <CardTitle className="text-lg mb-2">{safeString(post.title) || 'Untitled'}</CardTitle>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <div className="flex items-center space-x-2 text-zinc-400 text-sm">
          <button
            className={`flex border bg-[#1a1a1a] border-[#262626] p-2 rounded-2xl items-center ${liked ? 'text-red-500' : 'text-zinc-400'}`}
            onClick={() => setLiked(!liked)}
          >
            <Heart size={14} className="mr-1 " fill={liked ? 'red' : 'none'} /> {safeNumber(post.likes)}
          </button>
          <button className="border bg-[#1a1a1a] border-[#262626] p-2 rounded-2xl flex items-center text-zinc-400">
            <Send size={14} className="mr-1" /> 6
          </button>
        </div>
        <button
          className="border bg-[#1a1a1a] border-[#262626] pt-2  pb-2 pl-10 pr-10 rounded-lg text-[#666666] hover:underline flex items-center"
          onClick={() => router.push(`/homepage/${post._id}`)}
        >
          Read More <ArrowUpRight size={14} className="text-yellow-400 ml-1" />
        </button>
      </CardFooter>
    </Card>
  );
};

// Main component for the blog post list
const BlogPostList = () => {
  const { posts, isLoading, error, fetchPosts, deletePost } = useBlogStore();
   console.log(posts);
   
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      console.log('First post data:', posts[0]);
    }
  }, [posts]);

  if (isLoading) {
    return (
      <div className="text-white text-center p-8">
        <div className="loader"></div> 
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">Error: {safeString(error)}</div>;
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div className="text-white text-center p-8">
    <div className="loader"></div> 
    <p>Looking for posts.....</p>
  </div>
  }

  // Process and validate posts data
  const validPosts = posts.map(post => {
    if (!post || typeof post !== 'object') {
      console.error('Invalid post data:', post);
      return null;
    }

    return {
      ...post,
      _id: safeString(post._id),
      title: safeString(post.title),
      category: safeString(post.category),
      description: safeString(post.description),
      publicationDate: safeString(post.publicationDate),
      author: safeString(post.author),
      image: safeString(post.image),
      likes: safeNumber(post.likes),
      onDelete: deletePost
    };
  }).filter(Boolean); 

  if (validPosts.length === 0) {
    return <div className="text-white text-center p-8">No valid posts available.</div>;
  }

  const [featuredPost, ...otherPosts] = validPosts;

  return (
    <div className="container space-y-8 border-t-2 border-[#262626] max-h-[900px] overflow-y-auto relative">
  <FeaturedBlogPostCard post={featuredPost} />
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {otherPosts.map(post => (
      <BlogPostCard key={safeString(post._id)} post={post} />
    ))}
  </div>
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 animate-bounce text-yellow-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
    </svg>
    <span className="text-white text-sm">Scroll Down</span>
  </div>
</div>

  
  );
};

export default BlogPostList;
