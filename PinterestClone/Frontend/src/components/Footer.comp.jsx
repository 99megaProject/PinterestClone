import React from 'react'
import { appearanceStyleFn } from './utils.style02'
import { Link } from 'react-router-dom'

export default function Footer() {
    const appearanceStyle = appearanceStyleFn()

    return (
        <div className={`w-[100%]  absolute bottom-[10px] hidden justify-center flex ${appearanceStyle} `}>
            <footer>
                <div className='flex gap-[10px] '>
                    <Link to='/' >Home | </Link>
                    <Link to='/about' >About | </Link>
                    <Link to='/contact' >Contact | </Link>
                    <Link to='/create' >Create</Link>
                    <p>© 2023 Pinterest</p>
                </div>
                <div>
                </div>
            </footer>
        </div>
    )
}