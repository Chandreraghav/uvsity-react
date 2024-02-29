import React from "react";
import { AppButton, AppLink } from './shared';
import  { useState, useEffect } from 'react';
const Banner = ({ onLoginCTAClick, onSignUpCTAClick }) => {
  
  return (
    <>
    <div style={{ 
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         background: 'black url(https://dev.uvsity.com/assets/images/HeaderImage.jpg) no-repeat center center / cover',
         height: '100vh',
         color: 'white',
         backgroundColor: '#000008',
         animation: 'fadeIn 2s ease-in-out, slideInLeftContent 2s ease-in-out',
        
    }}>
      {/* Left side content */}
      <div className="gifContentWrap HeaderTextContent" style={{ animation: 'fadeInLeft 2s ease-in-out' }}>
      <ul className="section3Ul" style={{marginLeft:'5%',fontSize:'20px'}}>
        <li className="section3Li">
          <i aria-hidden="true" className="fa fa-check"></i>A Marketplace for all educators, coaches and session organizers.
        </li>
        <br/>
        <li className="section3Li">
          <i aria-hidden="true" className="fa fa-check"></i>Earn from your paid session or sponsorships from your sessions.
        </li>
        <br/>
        <li className="section3Li">
          <i aria-hidden="true" className="fa fa-check"></i>Earn from your one on one appointment.
        </li>
        <br/>
        <li className="section3Li">
          <i aria-hidden="true" className="fa fa-check"></i>Stay connected with your attendees and participants - Social Networking.
        </li>
      </ul>
      </div>
    
      {/* Right side content with background image */}
      <div className="subsection animated fadeInLeft videoSec" style={{ float: 'right', fontSize: '20px', marginBottom: '100px', position: 'relative', animation: 'fadeInRight 2s ease-in-out' }}>
        <div className="HeaderText">
            <h2 className="clearfix">
                <button style={{ backgroundColor: '#0f8dbf', padding: '5px 30px', cursor: 'pointer', position: 'absolute', top: 0, right: 0, animation: 'fadeInUp 2s ease-in-out' }} onClick={onSignUpCTAClick}>
                    Sign Up Now
                </button>
                <br/>
            </h2>
            <br />
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', animation: 'fadeInUp 2s ease-in-out' }}>
                & Create your own session today
            </h2>
            <br/>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', float: 'right', color: 'orange', animation: 'fadeInUp 2s ease-in-out' }}>
                No Payment Required
            </h2>
        </div>
</div>
</div>
<br/>




</>
  
    
  );
};
export default Banner;
