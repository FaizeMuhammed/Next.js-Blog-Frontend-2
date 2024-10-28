'use client'
import { useEffect } from "react"
import BlogPostList from "@/components/BlogPosts"
import Homeheader from "@/components/Homeheader"
import Maincomponent from "@/components/Maincomponent"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/stores/authStore"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { FaBlog, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import ProjectionComponents from "@/components/ProjectionComponents"
import Catchtitle from "@/components/Catchtitle"
import TechHero from "@/components/Techhero"
import Footer from "@/components/Footer"
import BlogListing from "@/components/Featuredblog"
import FeaturedHeading from "@/components/FeaturedHeading"



export default function HomePage() {
    const { user, logout } = useAuthStore();
    const isAuthorized = useAuthStore((state) => state.isAuthorized);
    const router = useRouter();
    const handleLogout = () => {
        logout();
        router.push('/login');
      };
      useEffect(() => {
    
   
    

        if (!user) {
          router.push('/login');
        } 
        
      }, [user]);
      
    return (
        <div className="Homepage w-full  bg-[#141414]">

            <Homeheader/>
            <Maincomponent/>
            <div className="container flex ">
            <ProjectionComponents src={'/circle.png'} text={"Latest News Updates"} subtext={'Stay Current'} para={'Over 1,000 articles published monthly'}/>
            <ProjectionComponents className="border border-[#262626] border-t-0 border-b-0" src={'/leaf.png'} text={"Expert Contributors"} subtext={'Trusted Insights'} para={'50+ renowned AI experts on our team'}/>
            <ProjectionComponents  src={'/spets.png'} text={"Global Readership"} subtext={'Worldwide Impact'} para={'2 million monthly readers'}/>
            </div>
            <Catchtitle/>
            
            <BlogPostList/>
            <FeaturedHeading/>
            <BlogListing/>
            <TechHero/>
            <Footer/>
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


    )
}