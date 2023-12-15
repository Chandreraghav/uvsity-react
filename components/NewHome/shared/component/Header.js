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

  useEffect(() => {
    if (anchorEl) {
      window.addEventListener('resize', onWindowResize);
    } else {
      window.removeEventListener('resize', onWindowResize);
    }

    return () => {
      window.removeEventListener('resize', onWindowResize);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);

  return (
    <header className="w-full bg-new-text-white border-b border-new-text-secondary fixed z-10">
      <div className="flex justify-between items-center container mx-auto">
        <img src="/static/images/logo/uvsity_header_logo.svg" alt="Uvsity" className="h-20" />
        <ul className="hidden md:flex">
          {
            (HeaderMenuItems || []).map(({ type, text }) => {
              return <li className="!mr-2" key={type || ''}><AppLink variant="body2" onClick={() => handleHeaderNavClick(type)}>{text}</AppLink></li>
            })
          }
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
