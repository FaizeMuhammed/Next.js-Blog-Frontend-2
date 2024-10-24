import React from 'react';
import { 
  Twitter, 
  Linkedin, 
  ArrowUpRight,
  Youtube 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  const footerLinks = [
    {
      title: "Home",
      items: [
        { label: "Features" },
        { label: "Blog" },
        { label: "Resources", isNew: true },
        { label: "Technology" },
        { label: "Contact Us" },
        { label: "Newsletter" }
      ]
    },
    {
      title: "News",
      items: [
        { label: "Trending Stories" },
        { label: "Featured Videos" },
        { label: "Technology" },
        { label: "Politics" },
        { label: "Environment" }
      ]
    },
    {
      title: "Blogs",
      items: [
        { label: "Quantum Computing" },
        { label: "AI Ethics" },
        { label: "Space Exploration" },
        { label: "Biotechnology", isNew: true },
        { label: "Renewable Energy" },
        { label: "Banking" }
      ]
    },
    {
      title: "Podcasts",
      items: [
        { label: "AI Revolution" },
        { label: "AI Revolution", isNew: true },
        { label: "YouTube AI" },
        { label: "AI Conversations" }
      ]
    },
    {
      title: "Resources",
      items: [
        { label: "Whitepapers", hasArrow: true },
        { label: "Ebooks", hasArrow: true },
        { label: "Reports", hasArrow: true },
        { label: "Research Papers", hasArrow: true }
      ]
    }
  ];

  return (
    <footer className="bg-[#141414] text-gray-400 py-12 px-4">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center group">
                    <a 
                      href="#" 
                      className="hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      {item.label}
                      {item.isNew && (
                        <Badge variant="outline" className="text-[10px] h-4 bg-zinc-800 text-white border-zinc-700">
                          New
                        </Badge>
                      )}
                      {item.hasArrow && (
                        <ArrowUpRight className="w-3 h-3 text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-zinc-800 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="text-sm">
            © 2024 FutureTech. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;