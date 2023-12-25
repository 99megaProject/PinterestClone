import React from "react";
import { btn_style } from './utils.style'
import { input_style } from './utils.style'


export default function EditProfile() {


    return (
        <div className="px-[3vw] bg-red-500 edit_profile ">
            <div className="flex flex-col gap-[20px] ">
                <div>
                    <h2 className="text-2xl font-semibold">Edit Profile</h2>
                    <p>
                        Keep your personal details private. Information you add here is visible to any who can view your profile
                    </p>
                </div>
                <div  >
                    <h6>Photo</h6>
                    <div className="flex gap-[10px] ">
                        <img src="https://cdn4.iconfinder.com/data/icons/people-avatar-2-1/128/85-512.png" className="content-cover rounded-full  h-[100px] w-[100px] " alt="" />
                        <button className={`${btn_style}`}>Change</button>
                    </div>
                </div>


                <div className="flex flex-col gap-[10px] ">
                    <div>
                        <h6>First Name</h6>
                        <input type="text" className={`${input_style}`} />
                    </div>
                    <div>
                        <h6>Last Name</h6>
                        <input type="text" className={`${input_style}`} />
                    </div>
                    <div>
                        <h6>Username</h6>
                        <input type="text" className={`${input_style}`} />
                    </div>

                </div>

                <div>
                    <h6>About</h6>
                    <textarea rows="4" className={`${input_style} !px-[5px] `} placeholder='Tell your story'></textarea>
                </div>


            </div>

        </div>
    )
}