import React, { useState } from "react";
import { appearanceStyleFn } from './utils.style02'
// import { login } from "../controllers/account.controller";
import { input_style, btn_style } from './utils.style'
import axios from "axios";
import { useEffect } from "react";




const div_style_1 = 'flex gap-[10px]'
const div_style_2 = 'flex flex-col gap-[5px]'

const input_style_2 = input_style + "!px-[10px]"

export default function Account() {

    const action = window.location.pathname
    const isSignUp = action.includes('signup')

    const appearanceStyle = appearanceStyleFn()

    console.log(isSignUp);



    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const stateHandle = (stateName, stateValue) => {
        stateName(stateValue)
    }

    const loginHandle = async () => {

        try {
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            };

            console.log('requesting...');
            const { data } = await axios.post('/api/v1/user/login', { email: 'amit@email.com', password: '402!!' }, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                    Accept: "*/*",

                }
            })

            console.log(data);

        }
        catch (error) {
            // console.log(error.message)
        }
    }

    useEffect(() => {
        ; (async function () {
            await loginHandle();
        })()
    }, [])

    return (
        <div className={`}px-[3vw] w-[100%] flex justify-center  items-center h-[100%] my-[30px] ${appearanceStyle} `}>

            <div className="flex flex-col gap-[10px] items-start ">
                <h2 className="font-bold text-3xl">{isSignUp ? 'Sign Up' : 'Log in'}</h2>
                <div className="flex flex-col gap-[10px] w-[100%] items-start ">
                    <div className={`${div_style_2} ${isSignUp ? 'block' : 'hidden'}`}>
                        <label htmlFor="first">First Name</label>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className={`${input_style_2}`} />
                    </div>
                    <div className={`${div_style_2} ${isSignUp ? 'block' : 'hidden'} `}>
                        <label htmlFor="last">Last Name</label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className={`${input_style_2}`} />
                    </div>
                    <div className={`${div_style_2}`} >
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" className={`${input_style_2}`} />
                    </div>
                    <div className={`${div_style_2}`}>
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" className={`${input_style_2}`} />
                    </div>


                </div>
                <button className={`${btn_style} hover:bg-red-500`} onClick={loginHandle} >{isSignUp ? 'Sign Up' : 'Log in'} </button>
            </div>

        </div>
    )
}