import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const TechHero = () => {
  const features = [
    {
      title: "Resource Access",
      description: "Visitors can access a wide range of resources, including ebooks, whitepapers, reports."
    },
    {
      title: "Community Forum",
      description: "Join our active community forum to discuss industry trends, share insights, and collaborate with peers."
    },
    {
      title: "Tech Events",
      description: "Stay updated on upcoming tech events, webinars, and conferences to enhance your knowledge."
    }
  ];

  return (
    <div className=" bg-[#1a1a1a] mt-8  text-white pb-10">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-8 pb-8">
        <div className="mb-12 w-full justify-evenly flex items-center">
          <div className="imglogo ">
          <img 
          src='/Logo.png'
            alt="Logo" 
            className="heroimg mb-6"
          />
          </div>
         
          <div className="herotags">
            <div className='heroimgsmall '>
            <img 
          src='/Logo.png'
            alt="Logo" 
            className="w-[60px] h-[60px] mb-6"
          />
             <p className="text-sm text-white mb-4 bg-[#333333] w-[250px] p-2 rounded-sm ">Learn, Connect, and Innovate</p>
            </div>
          <p className="text-sm text-white mb-4 bg-[#333333] w-[250px] p-2 rounded-sm yes ">Learn, Connect, and Innovate</p>
          
          <h1 className="text-[58px] md:text-4xl font-medium my-7 sm:pl-0 pl-5">
            Be Part of the Future Tech Revolution
          </h1>
          
          <p className="text-sm text-[#7E7E81] max-w-3xl sm:pl-0 pl-5">
            Immerse yourself in the world of future technology. Explore our comprehensive resources, connect with fellow tech enthusiasts, and drive innovation in the industry. Join a dynamic community of forward thinkers.
          </p>
          </div>
          
        </div>

        <div className="grid bg-[#141414] rounded-lg p-5 grid-cols-1 md:grid-cols-3 gap-6 ">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-[#1a1a1a] border-zinc-800 hover:bg-[#141414] transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-medium text-white">{feature.title}</h3>
                  <ArrowUpRight className="bg-yellow-400 rounded-full  w-5 h-5 text-[#141414]" />
                </div>
                <p className="text-sm text-[#98989a] leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechHero;