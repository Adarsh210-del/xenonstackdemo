import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {



    return (
        <>
            <nav>
                <div className='maindiv'>
                    <div>
                        <ol className='navitems'>
                            <NavLink to="/home"><li>Home</li></NavLink>
                            <NavLink to="/contact"><li>Contact Us</li></NavLink>
                            <NavLink to="/signup"><li>Sign Up</li></NavLink>
                            <NavLink to="/login"><li>Sign In</li></NavLink>
                            <NavLink to="/logout"><li>Logout</li></NavLink>
                            
                        </ol>
                    </div>


                </div>
            </nav >
        </>
    )
}

