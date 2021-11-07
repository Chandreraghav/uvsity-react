import React from "react";
import HeaderStyle from '../../../styles/Header.module.css';
import SearchIcon from '@mui/icons-material/Search';
import HeaderOption from "./HeaderOption";
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
function Header() {
  return (
    <div className={HeaderStyle.header}>
      <div className={HeaderStyle.header__left}>
        <img  src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE}
            alt="uvsity-Logo"/>

        <div className={HeaderStyle.header__search}>
            <SearchIcon/>
            <input placeholder='Search for people, sessions, topics, sponsors...' type="text" className=""/>
        </div>
      </div>
      
      <div className={HeaderStyle.header__right}>
          <HeaderOption Icon={HomeIcon} title='Home'/>
          <HeaderOption Icon={SupervisorAccountIcon} title='My Connections'/>
          <HeaderOption Icon={EventNoteOutlinedIcon} title='Sessions'/>
          <HeaderOption Icon={AppRegistrationOutlinedIcon} title='Topics'/>
          <HeaderOption Icon={AutoGraphOutlinedIcon} title='Sponsors'/>
          <HeaderOption Icon={MailOutlineIcon} title='Messages'/>
          <HeaderOption Icon={NotificationsIcon} title='Notifications'/>
          <HeaderOption isAuthorizedProfile
          avatar='https://lh3.googleusercontent.com/a-/AOh14Gj4zE9yHsoBriErUebkmDlq2CUfcu30Ql72DiOaAdA=s96-c'
            title='me' name='Swaroop Chakraborty'/>
      </div>
    </div>
  );
}

export default Header;
