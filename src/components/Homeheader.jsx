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
            {user && (
          <Button
            
            onClick={handleLogout}
            className=" sm:mr-[100px] mr-2 p-2 bg-[#262626] flex items-center  border-l-2 border-transparent "
          >
            {/* <FaSignOutAlt className="text-yellow-400"/> */}
            <span className=" lg:inline text-[#666666]">Logout</span>
          </Button>
        )}

        </div>


    )
}