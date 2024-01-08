import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'

const SharedLayout = () => {
    return (
        <>
            <div className="container">
                <Navbar />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
            <ToastContainer />

        </>)
}

export default SharedLayout