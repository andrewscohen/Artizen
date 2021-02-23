import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton';
import "./menu.css"
import HamburgerMenu  from "react-hamburger-menu"


const Menu = ({setAuthenticated}) => {

    const [click, setClick] = useState(true)
    
    const handleClick = () => {
        setClick(!click)
    }

    return (
        <>
            {
            click ?     
            <div>
            <Link to="/" className="logo"></Link>
                <HamburgerMenu 
                    isOpen={click}
                    menuClicked={() => handleClick} 
                />

            </div>
            :
            <div>
                <ul className='menu-list'>
                    
                    <li><Link style={{textDecoration: 'none'}}>Home</Link></li>
                    <li><Link style={{textDecoration: 'none'}}>Add a Location</Link></li>
                    <li><Link style={{textDecoration: 'none'}}>Create a Walk</Link></li>
                    <li>
                        <LogoutButton setAuthenticated={setAuthenticated} />
                    </li>
                </ul>
            </div>
            }
        </>
    )
}

export default Menu