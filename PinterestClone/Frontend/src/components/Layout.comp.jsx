import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './export.comp'
export default function Layout() {
    return (

        <>
            <Header />
            <Outlet />
            <Footer />
        </>

    )
}