import Resourses from "./Resourses";
import Submain from "./Submain";
import Titlesection from "./Titlesection";
import UserAvatarRow from "./UseAvatar";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";


export default function Maincomponent(){
    return (
        <div className="maincomponent container flex bg-[#141414]   ">
            <div className="mainhead w-[60%] border border-[#262626] border-t-0  border-l-0  flex flex-col justify-center items-center">
                <div className="tags h-[80%]  flex-col justify-center items-center">
                    <h5 className="text-[#666666] pb-1  ">Your Journey to Tomorrow Begins Here</h5>
                    <h1 className="text-white py-6 ">Explore the Frontiers of Artificial Intelligence</h1>
                    <p className="text-[#666666] py-2 ">Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines<br/> think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.</p>
                </div>
                <div className="h-[20%] flex justify-center w-full">
                <Resourses text={300} para={'Resourses Available'}/>
            <Resourses text={'12k'} para={'Total Dowanloads'}/>
            <Resourses text={'30k'} para={'Active Users'}/>
                </div>

            </div>
            <div className="subhead border border-[#262626] border-t-0   border-l-0 border-r-0 bg-[url('/Abstract%20Design.png')] bg-cover bg-center w-[40%] h-[600px]  flex flex-col justify-end ">

            <UserAvatarRow/>
            <h3 className="text-white py-6 px-8 text-[24px]">Explore 1000+ resources</h3>
            <p className="text-[#98989A] pl-8 text-[15px]">Over 1,000 articles on emerging tech trends and breakthroughs.</p>
            <Button className="w-[180px] m-8  border border-[#1a1a1a] bg-transparent text-[#98989a]" >Explore Resourses<ArrowRightIcon className="text-yellow-300" /></Button>



            </div>
           


        </div>
    )
}