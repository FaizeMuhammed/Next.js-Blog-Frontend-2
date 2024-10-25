import Image from "next/image"
import useAuthStore from "@/stores/authStore";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from "react-icons/fa";
export default function Homeheader() {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const handleLogout = () => {
        logout();
        router.push('/login');
      };
      
    return (
        <div className="logo  w-full flex justify-between  border-[#262626] bg-[#1a1a1a]
  items-center  py-6 " >
            <div className="flex justify-start items-center gap-4">
                <Image src="/Group.png" alt="Logo" width={40} height={40} />
                <h2 className="font-bold text-white">FutureTech</h2>
            </div>
            <div className="nave flex">
              <ul className="flex gap-8">
                <li className=" text-[#7e7e81]">Home</li>
                <li className=" text-[#7e7e81]">News</li>
                <li className=" text-[#7e7e81]">Podcasts</li>
                <li className=" text-[#7e7e81]">Resources</li>
              </ul>
              

            </div>
            <Button className="bg-yellow-400 text-black ">Contact us</Button>

        </div>


    )
}