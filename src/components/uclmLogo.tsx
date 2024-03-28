import React from 'react';
import logo from '../assets/University-of-Cebu-Logo.png'

interface LogoProps{
    width: number;
    height: number;
}

const LogoComponent: React.FC<LogoProps> = ({width, height}) => {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ width: `${width}px`, height:`${height}px`}}/>
    </div>
  );
};

export default LogoComponent;
