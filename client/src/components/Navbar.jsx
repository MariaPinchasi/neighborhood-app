import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom"
import { FaUser, FaHome } from 'react-icons/fa';
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';


const Navbar = () => {
    const { user, logout } = useGlobalUserContext();

    const [isProfileMenu, setIsProfileMenu] = useState(false);
    return (
        <nav className='navbar'>
            <h1> <Link to='/' className="logo"><FaHome /> HandyHood</Link></h1>
            <ul className="nav-links">
                <li>
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? 'active' : undefined}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/about'
                        className={({ isActive }) => isActive ? 'active' : undefined}>
                        About Us
                    </NavLink>
                </li>
                {user && <li>
                    <NavLink
                        to='/search'
                        className={({ isActive }) => isActive ? 'active' : undefined}>
                        Services
                    </NavLink>
                </li>}

            </ul>
            <button className='btn-user' onClick={() => setIsProfileMenu(!isProfileMenu)}><FaUser /></button>
            <div className={isProfileMenu ? 'profile-menu display-menu' : 'profile-menu'}>
                <div className='profile-links'>
                    {user && <p className="user-name">{`hello ${user.name}`}</p>}
                    {!user &&
                        <Link
                            to='/register'
                            onClick={() => {
                                setIsProfileMenu(false);
                            }}>
                            Register
                        </Link>
                    }
                    {user &&
                        <Link
                            to='/Profile'
                            onClick={() => {
                                setIsProfileMenu(false);
                            }}>
                            Profile
                        </Link>
                    }
                    {user &&
                        <Link
                            to='/'
                            onClick={() => {
                                setIsProfileMenu(false);
                                logout();
                            }}>
                            Log Out
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar