import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";


export default function Exporttext() {
    return (
        <div className="ml-8">
            <h3 className="text-white text-[24px] py-6 ">Explore 1000+ resources</h3>
            <p className="text-[#98989A] text-[18px] text-small  py-6">Over 1,000 articles on emerging tech trends and breakthroughs.</p>
            <Button
                variant="ghost"
                className="bg-transparent py-16 border-yellow-400 hover:bg-transparent text-white hover:bg-zinc-700 hover:text-white"
            >
                Explore Resources
                <ArrowUpRight className="text-yellow-300 ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}