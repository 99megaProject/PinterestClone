import React from "react";
import { appearanceStyleFn } from './utils.style02'


export default function Home() {
    const appearanceStyle = appearanceStyleFn()


    const img_style = 'rounded-2xl h-[400px] cursor-pointer '
    const img_style_horz = 'rounded-2xl w-[200px] content-cover h-[200px] cursor-pointer '

    return (
        <div className={`flex h-[100vh] flex-col  px-[20px] font-bold hidden  ${appearanceStyle} `}>

            <div className={`text-[60px] h-[100%] font-family-[Rethink Sans] flex flex-col items-center justify-center ${appearanceStyle} `}>
                <h1>
                    Get Your Next
                </h1>
                <h1>
                    Home Decore Idea.
                </h1>
            </div>

            <div className="flex gap-[10px] ">
                <img className={`${img_style}`} src="https://i.pinimg.com/236x/4f/9d/62/4f9d62cf06eb9cc7a25851d49f7689d6.jpg" alt="" />
                <img className={`${img_style}`} src="https://i.pinimg.com/236x/15/ba/fe/15bafefaabe62b0439a2e44fa800b26a.jpg" alt="" />
                <img className={`${img_style}`} src="https://i.pinimg.com/236x/03/3d/e3/033de3079c5a4d6e9e57e495931449e6.jpg" alt="" />
                <img className={`${img_style_horz}`} src="https://i.pinimg.com/236x/a0/56/9e/a0569ebdf9d66c593b558742cd46eac9.jpg" alt="" />
                <img className={`${img_style}`} src="https://i.pinimg.com/236x/46/d4/69/46d4694f915714cc69f1f3fb02031db8.jpg" alt="" />
                <img className={`${img_style_horz}`} src="https://i.pinimg.com/236x/18/5b/a8/185ba827d99969e322595428a3eec418.jpg" alt="" />
            </div>
        </div>
    )
}