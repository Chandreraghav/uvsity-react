import React from "react";
import { AppButton } from './shared';

const PreFooter = ({ openSignUp }) => {
  return (
    <>
         <br/>
{/* left-video and right-text */}
<div>
      <h3 style={{ textAlign: 'center',color:'#0f8dbf',fontSize:'30px' }}><strong>How to set availability in your calendar</strong></h3><br/>
      <br/>
<br/>
<br/>
      <div className="howToWrap one clearfix" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
       
        <div className="subsection animated fadeInLeft videoSec">
          <div className="gifWrap" >
           <video width="80%" autoPlay muted controls loop style={{textAlign:'center',marginLeft:'20%'}}>
              <source src="https://s3.amazonaws.com/uvsityImages/HowToSetAvailability.mp4" type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
        </div>

        <div className="subsection animated fadeInRight contentSec">
          <div className="gifContentWrap">
          <ul className="section3Ul" style={{padding: '20px 0',marginLeft:'30px',color:'#108dbf'}}>
              <li className="section3Li" >
              <i className="fa fa-check" aria-hidden="true"></i>Don't forget to set your availability after you signup.
              </li>
              <br/>
              <li className="section3Li">
                <i className="fa fa-check" aria-hidden="true"></i> To set, click on My Calendar, click on Availability Settings
                Session.
              </li>
              <br/>
              <li className="section3Li">
                <i className="fa fa-check" aria-hidden="true"></i>  Copy your appointment link and embed in your website or share in email signature.
              </li>
              <br/>
            </ul>
          </div>
        </div>



      </div>
    </div>
{/* left-video and right-text close*/}
    
    </>
    // <section className="w-full py-16 bg-new-tertiary">
    //   <div className="container flex flex-col mx-auto items-center py-8">
    //     <h2 className="text-3xl lg:text-4xl text-new-primary mb-4 font-bold text-center">Join Our Educational Community Today!</h2>
    //     <p className="text-xl lg:text-2xl max-w-3xl text-center text-new-secondary">Your Comprehensive Solution for Scheduling, Appointments, and Community Engagement.</p>
    //     <AppButton className="!px-12 !py-3 lg:!px-20 mt-4" onClick={openSignUp}>Sign up for free</AppButton>        
    //   </div>
    // </section>
  );
};
export default PreFooter;
