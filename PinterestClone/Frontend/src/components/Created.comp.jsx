import React from 'react'
import { btn_style } from './utils.style'
import { FiEdit } from "react-icons/fi";

const display_style = 'flex w-[100%] flex-col gap-[10px] '
const input_style = 'px-[20px] py-[5px] border-[2px] border-zinc-400 rounded-2xl focus:outline-none '

export default function Created() {

    const newImg = new Image()
    newImg.src = 'https://i.pinimg.com/236x/60/ae/f7/60aef71e25f9cfe74f91e4d2f801fd28.jpg'
    console.log(newImg.height, newImg.width);

    return (
        <div className='w-[100%] flex px-[4vw] my-[20px] '>
           
            <div className='flex w-[100%] flex-col items-center gap-[20px] '>

                <div className='relative'>
                    {/* <img className='rounded-2xl ' src="https://i.pinimg.com/236x/8e/59/87/8e5987ee1be35344bbf04cfd2e005ac3.jpg" alt="" /> */}
                    <div className={`relative rounded-2xl bg-cover bg-no-repet ${newImg && newImg.height > newImg.width ? 'h-[300px] w-[200px] ' : 'h-[200px] w-[300px] '} `} style={{ backgroundImage: `url(${'https://i.pinimg.com/236x/60/ae/f7/60aef71e25f9cfe74f91e4d2f801fd28.jpg'})` }}>
                        < FiEdit className='text-2xl absolute right-[10px] top-[5px] text-white font-bold ' />

                    </div>
                </div>
                <div className={`${display_style}`}>
                    <label htmlFor="title">Title</label>
                    <input className={`${input_style}`} type="text" id='title' placeholder='Add a Title' />
                </div>
                <div className={`${display_style}`}>
                    <label htmlFor="description">Description</label>
                    <textarea className={`${input_style}`} id="description" cols="" rows="3" placeholder='Add a detailed Description' ></textarea>
                </div>
                <div className={`${display_style}`}>
                    <label htmlFor="link">Link</label>
                    <input className={`${input_style}`} type="text" id='link' placeholder='Add a link' />
                </div>
                <div className={`${display_style}`}>
                    <label htmlFor="topic">Topic</label>
                    <input className={`${input_style}`} type="text" id='topic' placeholder='Add a topic' />
                </div>
                <button className={`${btn_style} hover:bg-red-800`}>Publish</button>
            </div>
        </div>
    )
}