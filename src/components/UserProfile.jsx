import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ setOpenBoxes }) => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const HandleLogout = () => {
    sessionStorage.removeItem("IsLoggedIn");
    sessionStorage.removeItem("Data");
    sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload(false);
  };
  const Data = JSON.parse(sessionStorage.getItem("Data"));
  return (
    <div className="nav-item absolute right-5 top-16 shadow-2xl bg-white dark:bg-[#42464D] p-8 rounded-lg w-80">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <button
          type="button"
          onClick={() => setOpenBoxes("")}
          style={{
            color: "rgb(153, 171, 180)",
            borderRadius: "50%",
          }}
          className={` text-2xl p-3  hover:drop-shadow-xl hover:bg-light-gray`}
        >
          <FaXmark />
        </button>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {Data.name}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Administrator
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {Data.email}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={() => HandleLogout()}
          style={{ backgroundColor: currentColor, borderRadius: "10px" }}
          className={`p-3 w-full text-white hover:drop-shadow-xl`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
