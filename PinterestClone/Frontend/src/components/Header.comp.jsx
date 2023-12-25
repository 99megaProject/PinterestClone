import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { appearanceStyleFn } from "./utils.style02";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";

// style variable
const btn_style = "bg-zinc-200 px-[20px] py-[5px] rounded-2xl";
const respon_flex_style = "flex flex-col md:flex md:flex-row ";

export default function Header() {
  // from imported
  const navigate = useNavigate();
  const appearanceStyle = appearanceStyleFn();
  const [menu_flage, set_menu_flage] = useState(true);
  const [search_flage, set_search_flage] = useState(false);
  const isLogin = true;

  return (
    <div>
      <div
        className={` flex gap-[20px] w-[100%] px-[20px] md:px-[4vw] h-[70px] bg-red-600 items-center justify-between ${appearanceStyle} `}
      >
        {/* left section  */}

        <div className={`flex w-[100%] justify-between `}>
          <div
            className={`gap-[20px] items-center flex  w-[100%] justify-between `}
          >
            <img
              className="w-[40px] h-[40px] content-contain  "
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
              alt="pintere Logo"
              onClick={() => navigate("/")}
            />
            <FaSearch className={`text-3xl flex md:hidden `} />

            <Link className={`hidden lg:flex`} to="/">
              Today
            </Link>

            <Link className={`hidden lg:flex`} to="/">
              Home
            </Link>
            <p className={`${isLogin ? " lg:flex hidden" : "hidden"}`}>
              Explore
            </p>
            <p className={`${isLogin ? "lg:flex hidden" : "hidden"}`}>
              Create{" "}
            </p>
          </div>

          <div
            className={`${isLogin ? "flex items-center  " : "hidden"
              } w-[100%] hidden md:flex`}
          >
            <FaSearch
              onClick={() => set_search_flage(!search_flage)}
              className={`text-zinc-500 md:translate-x-[30px]`}
            />
            <input
              type="text"
              placeholder="Search"
              className={`px-[60px] bg-zinc-200 rounded-2xl   border-zinc-200 border-[3px]   py-[5px]  ${search_flage ? "hidden md:flex " : "flex"
                } `}
            />
          </div>


          <div className={`flex gap-[20px]  items-center  `}>
            <div className={` flex lg:flex hidden gap-[20px] items-center `}>
              <p>About</p>
              <p>Bussiness</p>
            </div>
            <div className="flex gap-[20px] ">
              <Link to="/account/login">
                <button
                  className={`${btn_style} !bg-red-700 text-white ${!isLogin ? "flex" : "hidden"
                    } `}
                >
                  Log in
                </button>
              </Link>
              <Link to="/account/signup">
                <button
                  className={`${btn_style} ${!isLogin ? "flex" : "hidden"} `}
                >
                  Sign up
                </button>
              </Link>
            </div>
          </div>

          <div
            className={`flex gap-[20px] text-2xl items-center ${isLogin ? "lg:flex hidden" : "hidden"
              }  `}
          >
            <IoIosNotifications className="text-3xl" />
            <FaMessage />
            <div className="rounded-full h-[30px] w-[30px] flex justify-center items-center bg-yellow-500 text-center ">
              <p className="p-[10px] !text-1xl ">S</p>
            </div>
            <IoSettingsOutline
              className="text-3xl"
              onClick={() => navigate("/setting")}
            />
          </div>
        </div>
      </div>

      <div className={` w-[100%] ${isLogin ? "flex lg:hidden" : "hidden"} `}>
        <div className={`!fixed z-44 !bottom-0 h-[50px] bg-red-500 w-[100%]  `}>
          <div className="flex w-[100%] justify-between text-3xl text-white items-center px-[20px] h-[100%] ">
            <FaHome onClick={() => navigate("/")} />

            <IoMdContact onClick={() => navigate("/profile")} />
            <IoMdSettings onClick={() => navigate("/setting")} />
            <HiMenuAlt3 onClick={() => navigate("/menu")} />
          </div>{" "}
        </div>

        <div className="hidden">
          {/* left section  */}
          <div className="flex  w-[100%] justify-between">
            <img
              className="w-[40px] h-[40px] content-contain  "
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png"
              alt="pintere Logo"
              onClick={() => navigate("/")}
            />


          </div>

          <div
            className={`${!menu_flage ? "flex flex-col absolute top-0 left-0" : "hidden"
              } !bg-red-400`}
          >
            <div
              className={`${respon_flex_style} gap-[20px] items-center bg-green-400 `}
            >
              <Link className={`${!menu_flage ? "flex" : "hidden"}`} to="/">
                Today
              </Link>
              <Link className={`${!menu_flage ? "flex" : "hidden"}`} to="/">
                Watch
              </Link>
              <Link className={`${!menu_flage ? "flex" : "hidden"}`} to="/">
                Home
              </Link>
              <p className={`${isLogin ? "flex" : "hidden"}`}>Explore</p>
              <p className={`${isLogin ? "flex" : "hidden"}`}>Create </p>
            </div>

            <div className="flex items-center  ">
              <FaSearch className="text-zinc-500 translate-x-[30px]" />
              <input
                type="text"
                placeholder="Search"
                className="px-[20px] md:px-[60px] bg-zinc-200 rounded-2xl   border-zinc-200 border-[3px]  py-[5px] "
              />
            </div>

            {/* right section  */}
            <div
              className={`flex gap-[20px] ${!menu_flage ? "flex " : "hidden"
                }  items-center  `}
            >
              <div
                className={`md:flex-row flex  flex-col  ${menu_flage ? "flex flex-col" : "hidden"
                  }  gap-[20px] items-center `}
              >
                <p>About</p>
                <p>Bussiness</p>
              </div>
              <div className="flex gap-[20px] ">
                <Link to="/account/login">
                  <button className={`${btn_style} !bg-red-700 text-white `}>
                    Log in
                  </button>
                </Link>
                <Link to="/account/signup">
                  <button className={`${btn_style}`}>Sign up</button>
                </Link>
              </div>
            </div>

            <div
              className={`flex gap-[20px] text-2xl items-center ${isLogin ? "hidden" : "hidden"
                }  `}
            >
              <IoIosNotifications className="text-3xl" />
              <FaMessage />
              <div className="rounded-full h-[30px] w-[30px] flex justify-center items-center bg-yellow-500 text-center ">
                <p className="p-[10px] !text-1xl ">S</p>
              </div>
              <IoSettingsOutline
                className="text-3xl"
                onClick={() => navigate("/setting")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
