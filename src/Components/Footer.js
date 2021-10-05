import React  from 'react';
import githubicon from './img/githubicon.png';

const Footer = () => (
    <footer>
        <div className="github"><img src={githubicon} alt="Github" title="Icono de Github" width="25px" height="25px"/></div>
        <small><a href="https://github.com/dianalejandra">web-app made by Diana, 2021</a></small>
    </footer>
);

export default Footer;