/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import { FooterMenuItems } from '../constants'
import { AppLink } from './AppLink';
/**
 * There should be one footer
 * If this is approved, we will move to shared and add features to it.
 * @returns 
 */
export const Footer = () => {
  const footerCopyrightText = useMemo(() => {
    return process.env.NEXT_PUBLIC_APP_FOOTER_TEXT || '';
  }, []);

  return (
    <footer className="w-full bg-new-text-white border-t border-new-text-secondary py-8">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center container mx-auto">
        <span>{footerCopyrightText}</span>
        <ul className="flex flex-col lg:flex-row">
          {
            (FooterMenuItems || []).map((currentItem) => {
              return (
                <li key={currentItem?.text || ''} className="text-center lg:text-right">
                  <AppLink href={currentItem?.href || ''} target="_blank" variant="body2">
                    {currentItem.text}
                  </AppLink>
                </li>
              )
            })
          }
        </ul>
      </div>
    </footer>
  );
};
