import { IoNotificationsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const NavbarAdminTop = () => {
  return (
    <>
      <div className="flex-row w-full bg-white h-16 drop-shadow-md sticky">
        <div className="flex justify-end mr-8">
          <IoNotificationsSharp className="w-8 mt-6 hover:cursor-pointer text-blackPrimary" />
          <FaUserCircle className="w-8 mt-6 hover:cursor-pointer text-blackPrimary" />
        </div>
      </div>
    </>
  );
};

export default NavbarAdminTop;
