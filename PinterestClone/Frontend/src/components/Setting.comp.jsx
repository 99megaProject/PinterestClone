import React from "react";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { apperanceReduc } from "../slices/uiFeature.slice";
import { menu_style } from "../components/utils.style";

import { IoEarthSharp } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { appearanceStyleFn } from "./utils.style02";

const div_style_1 = "flex gap-[10px] items-center ";

export default function Setting() {
  const appearance = useSelector((state) => state.uiFeatureSlice.appearance);
  const dispatch = useDispatch();

  // appearance handle

  const appearanceHandle = () => {
    dispatch(apperanceReduc(!appearance));
  };

  return (
    <div className="px-[3vw] my-[10px] ">
      <div className="flex flex-col gap-[10px] ">
        <div className={`${div_style_1}`}>
          <p className={`${menu_style}`}>Log out </p>
          <IoExitOutline />
        </div>
        <div
          className={`${div_style_1} cursor-pointer `}
          onClick={appearanceHandle}
        >
          <p className={`${menu_style}`}>{appearance ? "Dark" : "Light"} </p>
          <MdOutlineDarkMode className={`${appearance ? "flex" : "hidden"}`} />
          <MdOutlineLightMode className={`${appearance ? "hidden" : "flex"}`} />
        </div>
      </div>
    </div>
  );
}

export const Menu = () => {
  // const style_1 = "px-[30px] py-[5px] rounded bg-zinc-200 w-[100%] ";
  const appearanceStyle = appearanceStyleFn();
  return (
    <div className="flex flex-col px-[3vw] my-[10px]  ">
      <div className={` flex flex-col gap-[5px] w-[97vw] ${appearanceStyle}  items-center`}>
        <div className={`${div_style_1} w-[95%]`}>
          <p className={`${menu_style}`}>Explore</p>
          <IoEarthSharp />
        </div>
        <div className={`${div_style_1} w-[95%]`}>
          <p className={`${menu_style}`}>About</p>
          <IoMdInformationCircleOutline />
        </div>
        <div className={`${div_style_1} w-[95%]`}>
          <p className={`${menu_style}`}>Contact</p>
          <MdOutlineMailOutline />
        </div>
        <div className={`${div_style_1} w-[95%]`}>
          <p className={`${menu_style}`}>Bussiness</p>
          <FaRegAddressCard />
        </div>
      </div>
    </div>
  );
};
