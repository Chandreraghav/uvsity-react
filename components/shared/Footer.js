import React from 'react'
import FooterStyle from  "../../styles/Footer.module.css";

function Footer(props) {
    return (
      <footer className={`${props?.minimizeOnSmallScreens?'hidden md:block':''} ${FooterStyle.footer}`}>
        <ul className={FooterStyle.child__footer__links}>
          <li className={`${FooterStyle.child__footer__link__wrapper}`}>
            <a className={`${FooterStyle.child__footer__link}  app__anchor__footer`} href="/browse/subtitles">
                User Agreement
              
            </a>
          </li>

          <li className={FooterStyle.child__footer__link__wrapper}>
            <a className={`${FooterStyle.child__footer__link} app__anchor__footer`} href="/browse/subtitles">
                Privacy Policy
               
            </a>
          </li>

          <li className={FooterStyle.child__footer__link__wrapper}>
            <a className={`${FooterStyle.child__footer__link} app__anchor__footer`} href="/browse/subtitles">
               Help Center
               
            </a>
          </li>

          <li className={FooterStyle.child__footer__link__wrapper}>
            <a className={`${FooterStyle.child__footer__link} app__anchor__footer`} href="/browse/subtitles">
                Contact us
               
            </a>
          </li>
           
        </ul>
           <div className={FooterStyle.child__footer__copyright}>
        <span>{process.env.NEXT_PUBLIC_APP_FOOTER_TEXT}</span>
        <span className={FooterStyle.child__footer__copyright__instance}>Build: {process.env.NEXT_PUBLIC_APP_OG_TOKEN_UUID}</span></div>
      </footer>
    );
}

export default Footer
