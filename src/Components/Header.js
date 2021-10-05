import React  from 'react';
import {NavLink} from 'react-router-dom'
import WEATHER_LOGO from './img/WEATHER_LOGO.png';

const Header = () => (
    <header>
        <NavLink to={"/"} style={{ textDecoration: 'none' }}><h1>Weather App</h1></NavLink>
        <img id="logo" src={WEATHER_LOGO} alt='WEATHER_LOGO' width="100"/>
    </header>
);

export default Header;