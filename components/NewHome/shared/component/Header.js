/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { HeaderMenuItems, HeaderMenuTypes } from '../constants'
import { AppLink } from './AppLink';

/**
 * There should be one header
 * There are already two - logged in and logged out. If this is approved, we will move to shared and add features to it.
 * @returns 
 */
export const Header = ({ handleHeaderNavClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
 
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const onWindowResize = () => {
    console.log('close menu');
    closeMenu();
  }

  const handleContinueWithGoogleClick = () => {
    const googleLink = HeaderMenuItems.find(item => item.type === HeaderMenuTypes.CONTINUE_WITH_GOOGLE)?.link;
    if (googleLink) {
      const windowWidth = 600;
      const windowHeight = 400;
      const left = (window.innerWidth - windowWidth) / 2 + window.screenX;
      const top = (window.innerHeight - windowHeight) / 2 + window.screenY;
      const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`;

      window.open(googleLink, '_blank', windowFeatures);
    }
  };
  useEffect(() => {
    if (anchorEl) {
      window.addEventListener('resize', onWindowResize);
    } else {
      window.removeEventListener('resize', onWindowResize);
    }

    return () => {
      window.removeEventListener('resize', onWindowResize);
    }
  }, [anchorEl]);


  const handleLiveSessionsClick = () => {
    
  };

  const handleHowItWorksClick = () => {
   
  };

 


  return (
    <header className="w-full bg-new-text-white border-new-text-secondary fixed z-10">
    <div className="flex justify-between items-center container mx-auto">
      <div>
        <big><strong style={{ fontSize: '40px',color:"#0f8dbf" }}>Uvsity</strong></big>
        <small style={{color:"#0f8dbf"}}><strong>.com</strong></small>
      </div> &nbsp;&nbsp;&nbsp;&nbsp;  
      <div className="flex md:flex-grow items-center">

  <div className="hidden md:flex md:items-center" style={{marginBottom:'5px',justifyContent:'space-around',color:'#4285f4'}}>
    <a href="#videoSection"  className="block mt-4 md:inline-block md:mt-0 mr-6" onClick={handleLiveSessionsClick}>Live Sessions</a>
    <a href="#EarnBanner" className="block mt-4 md:inline-block md:mt-0 mr-6" onClick={handleHowItWorksClick}>How it Works</a>
  </div>
</div>
    
<ul className="hidden md:flex">
      {HeaderMenuItems.map(({ type, text, link }, index) => (
        <React.Fragment key={type || ''}>
          <li className="!mr-2">
            {type === HeaderMenuTypes.CONTINUE_WITH_GOOGLE ? (
              <button onClick={handleContinueWithGoogleClick} style={{ backgroundColor: '#4285f4', color: 'white', boxSizing: 'border-box', width: '100%', textAlign: 'center', height: '30px', width: '210px',paddingRight:'2px' }}>
               &nbsp;&nbsp;  {text}
               <img src="https://dev.uvsity.com/0fa3fe04edf6c0202970f2088edea9e7.png" alt="Google Logo" style={{ marginLeft: '1px', height: '83%',marginTop:'0px',position:'relative',bottom:'21px',backgroundColor:'white',border:'solid  #4285f4 0px' }} />
              </button>
            ) : (
              <button onClick={() => handleHeaderNavClick(type, link)} style={{ backgroundColor: '#0f8dbf', color: 'white', boxSizing: 'border-box', width: '100%', textAlign: 'center', height: '30px', width: '200px' }}>
                {text}
              </button>
            )}
          </li>
          {index < HeaderMenuItems.length - 1 && (
            <li className="!mr-2">
              <span style={{ color: '#0f8dbf', fontSize: '20px' }}><strong>--or--</strong></span>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  

      {<div className="flex block md:!hidden cursor-pointer"><MenuIcon onClick={openMenu} /></div>}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {
          (HeaderMenuItems || []).map(({ type, text }) => {
            return <MenuItem key={type} onClick={closeMenu}>{text}</MenuItem>
          })
        }
      </Menu>
    </div>
  </header>
  
  
  );
};
