import React, { useState } from "react";
import './navbar.css'
import { IconButton } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons';
import  Auth  from '../../utils/auth'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const navigate = useNavigate()

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  }

  return (
    <div style={{ width: '100%' }}>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
      </nav>
      <div className={menu_class}>
        <ul>
          <li onClick={() => navigate('/')}>
            CALL
            <br></br>
            <IconButton className="phone" colorScheme='#' aria-label='Call Segun' size='lg' icon={<PhoneIcon />} />
          </li>
          <li onClick={() => { Auth.logout() }}>
            Logout<img src='./images/logout.svg' className="logout" alt='Logout' />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;