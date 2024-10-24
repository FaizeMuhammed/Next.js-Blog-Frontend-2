import Exporttext from "./Exploretext";
import UserAvatarRow from "./UseAvatar";

export default function Submain() {
    return (
      <div className="bg-[url('/Abstract%20Design.png')] w-[40%] h-[512px] bg-black bg-cover flex flex-col justify-end">
        <UserAvatarRow/>
        <Exporttext/>
      </div>
    );
  }
  