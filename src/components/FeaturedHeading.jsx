import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const FeaturedHeading = (props) => {
  return (

    <div className="pb-10 pt-[70px] container bg-[#1a1a1a] flex justify-between items-center">
      <div className=" mb-4">
        <span className="text-zinc-400 text-sm bg-[#333333] p-2 rounded-sm sm:ml-0 ml-3">Featured Blog</span>
        <h1 className="text-4xl pt-6 font-medium text-white mb-8 tracking-tight sm:pl-0 pl-3">
          Visual Insights for the Modern Viewer
        </h1>
      </div>

      <button className="bg-[#141414] sm:px-2 sm:py-2 px-12 py-3  text-white rounded-md text-sm flex items-center gap-1 hover:text-zinc-300 transition-colors">
        View All <ArrowUpRight className='text-yellow-400' size={16} />
      </button>
    </div>

  )
}

export default FeaturedHeading
