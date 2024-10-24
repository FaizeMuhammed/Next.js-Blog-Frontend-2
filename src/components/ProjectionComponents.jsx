import { Button } from "./ui/button"
import { ArrowUpRight } from "lucide-react"
export default function ProjectionComponents({className,src,text,subtext,para}){

    return(
        
            <div className={`latestupdate px-4  py-6 w-full bg-[#141414] ${className} `}>
                <img className="py-6" src={src} alt="" />
                <div className="flex w-full justify-between text-white">
                    <div>
                        <h4 className="text-white text-[20px]">{text}</h4>
                        <p className="text-[#666666] text-[18px]">{subtext}</p>
                    </div>
                    <Button className="bg-yellow-400 rounded-full"><ArrowUpRight className=" text-[#262626]"/></Button>
                    
                </div>
                <p className="text-[#666666] text-[20px] pt-6">{para}</p>

            </div>

        
    )
}