import React, { useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom"
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'

const SharedLayout = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to the top of the page when the route changes
        window.scrollTo(0, 0);
    }, [location]);
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