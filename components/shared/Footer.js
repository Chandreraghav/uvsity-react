import React from 'react'
import FooterStyle from  "../../styles/Footer.module.css";

function Footer() {
    return (
      <div className={FooterStyle.footer}>
        <ul className={FooterStyle.child__footer__links}>
          <li className={FooterStyle.child__footer__link__wrapper}>
            <a className={`${FooterStyle.child__footer__link} app__anchor`} href="/browse/subtitles">
              <span className={FooterStyle.child__footer__link__content}>
               User Agreement
              </span>
            </a>
          </li>

          <li className={FooterStyle.child__footer__link__wrapper}>
            <a className={`${FooterStyle.child__footer__link} app__anchor`} href="/browse/subtitles">
              <span className={FooterStyle.child__footer__link__content}>
                Privacy Policy
              </span>
            </a>
          </li>

          <li className={FooterStyle.child__footer__link__wrapper}>
            <a className={`${FooterStyle.child__footer__link} app__anchor`} href="/browse/subtitles">
              <span className={FooterStyle.child__footer__link__content}>
               Help Center
              </span>
            </a>
          </li>

          <li className={FooterStyle.child__footer__link__wrapper}>
            <a className={`${FooterStyle.child__footer__link} app__anchor`} href="/browse/subtitles">
              <span className={FooterStyle.child__footer__link__content}>
               Contact us
              </span>
            </a>
          </li>
           
        </ul>
           <div className={FooterStyle.child__footer__copyright}>
        <span>{process.env.NEXT_PUBLIC_APP_FOOTER_TEXT}‎</span>
        <span className={FooterStyle.child__footer__copyright__instance}>Build: {process.env.NEXT_PUBLIC_APP_OG_TOKEN_UUID}</span></div>
      </div>
    );
}

export default Footer
