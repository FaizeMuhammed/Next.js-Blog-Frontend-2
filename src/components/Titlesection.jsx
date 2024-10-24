import Infoelements from "./Infoelements";

export default function Titlesection(){

    return(
        <div className="w-[60%] bg-black flex flex-col">
           <div className="ml-16 mt-16 mb-16">
           <h5 className="text-[#666666] text-[30px]">Your Jouerny To Tomorrow Begins Here</h5>
            <h1 className="text-[#ffff] text-[70px]">Explore The Frontires of Artifical Intelligence</h1>
            <p className="text-[#666666] text-[18px]">Welcome to the epicenter of AI innovation.
                 FutureTech AI News is your passport to a world where machines
                  think, learn, and reshape the future. Join us on this
                   visionary expedition into the heart of AI.</p>
           </div>
           <div className="flex gap-8 ">
            <Infoelements />
            <Infoelements/>
            <Infoelements/>

           </div>

        </div>
    )
}