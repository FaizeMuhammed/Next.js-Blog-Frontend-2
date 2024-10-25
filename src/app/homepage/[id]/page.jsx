'use client';
import React, { useEffect } from 'react';
import { Heart, Eye, MessageSquare } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator'; 
import useBlogStore from '@/stores/blogStore';
import BlogPostList from '@/components/BlogPosts';
import TechHero from '@/components/Techhero';
import Footer from '@/components/Footer';
import Homeheader from '@/components/Homeheader';

const BlogPostDetail = ({ params }) => {
  const router = useRouter();
  const { posts, fetchPosts } = useBlogStore();

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
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const post = posts?.find(p => p._id === params.id);

  if (!post) {
    return (
      <div className="container mx-auto p-8 text-white text-center">
        <p>Post not found</p>
      </div>
    );
  }

  const tableOfContents = [
    "Introduction",
    "AI in Diagnostic Imaging",
    "Predictive Analytics and Disease Prevention",
    "Drug Discovery and Research",
    "AI in Telemedicine",
    "Ethical Considerations",
    "The Future of AI in Healthcare",
    "Conclusion"
  ];

  return (
    <div className='w-full bg-[#141414]'>
        <Homeheader/>
    <div className="min-h-screen bg-[#141414] text-white">
      
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141414]" />
        <img
          src={getCategoryImage(post.category)}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        
        
        <div className="absolute bottom-32 left-0 right-0 px-4 md:px-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">
            {post.title}
          </h1>

         
          
        </div>
      </div>

      
      <div className="px-4 md:px-16 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          
          <div className="col-span-1 md:col-span-3 space-y-12 sm:w-[70%]">
            
             {post.paragraphs?.map((paragraph, index) => (
              <section key={index} className="mb-8">
                {paragraph.heading && (
                  <h2 className="text-2xl font-bold mb-4">{paragraph.heading}</h2>
                )}
                <p className="text-zinc-400 leading-relaxed">{paragraph.content}</p>
              </section>
            ))}
            <section>
              <h2 className="text-2xl font-bold mb-4">Artificial Intelligence (AI)</h2>
              <p className="text-zinc-400 leading-relaxed">
                Artificial intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. 
                The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities 
                of healthcare providers. This article delves into the diverse applications of AI in healthcare, from diagnostic imaging 
                to personalized treatment plans, and address the ethical considerations surrounding this revolutionary technology.
              </p>
            </section>

            
            <section>
              <h2 className="text-2xl font-bold mb-4">Predictive Analytics and Disease Prevention</h2>
              <p className="text-zinc-400 leading-relaxed">
                One of the most beneficial applications of AI in healthcare is diagnostic imaging. AI algorithms help healthcare 
                providers analyze medical images more quickly and accurately than ever before. Machine learning models can detect 
                subtle patterns that might escape the human eye, leading to earlier diagnosis of conditions like cancer, heart disease, 
                and neurological disorders.
              </p>
            </section>

            
           

           

          </div>

         
          <div className="col-span-1 space-y-8 sm:w-[30%]">
            
            <div className="flex gap-4 md:gap-8 items-center">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" size={20} />
              <span>24.5k</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="text-zinc-400" size={20} />
              <span>55k</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="text-zinc-400" size={20} />
              <span>2k</span>
            </div>
          </div>
            <div>
              <p className="text-zinc-400 text-sm">Publication Date</p>
              <p>{formatDate(post.publishingDate) || 'Date not available'}</p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Category</p>
              <p>{post.category}</p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Reading Time</p>
              <p>15 Min</p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Author Name</p>
              <p>{post.authorName}</p>
            </div>

            
            
          </div>
        </div>
      </div>
    </div>
    <BlogPostList/>
    <TechHero/>
    <Footer/>
    </div>
  );
};

export default BlogPostDetail;
