import React from "react";
import { FaSearch } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";


export default function Message() {
    return (
        <div className="rounded-2xl flex justify-center px-[3vw] py-[20px] ">
            <div className="flex flex-col items-center gap-[20px] ">
                <h2 className="font-bold">Inbox</h2>
                <div>
                    <div className="flex items-center  " >
                        < FaSearch className="text-zinc-500 translate-x-[30px]" />
                        <input type="text" placeholder="Search by name or email " className="px-[60px] focus:outline-none bg-zinc-200 rounded-2xl   border-zinc-200 border-[3px]  py-[5px] " />
                    </div>
                </div>
                {/* new message  */}
                <div className="py-[5px] items-center font-bold flex gap-[10px] ">
                    <div className="bg-green-400 flex items-center justify-center  rounded-full w-[30px] h-[30px] " >
                        <FiEdit />
                    </div>
                    <p>New Message</p>
                </div>

            </div>

        </div>
    )
}