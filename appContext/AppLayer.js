import React, { useState, useEffect } from "react";
import CommonMetaInfo from "../pages/components/CommonMetaInfo";
import Footer from "../pages/components/Footer";
import Nav from "../pages/components/Nav";

const AppLayer = ({ children, ...pageProps }) => {
  function recursiveMap(children, fn) {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child) || typeof child.type == "string") {
        return child;
      }

      if (child.props.children) {
        child = React.cloneElement(child, {
          children: recursiveMap(child.props.children, fn),
        });
      }

      return fn(child);
    });
  }

  // Add props to all child elements.
  const childrenWithProps = recursiveMap(children, (child) => {
    
    return React.cloneElement(child, {});
  });
  return (
    <>
      <CommonMetaInfo/>
      <Nav/>
      <div className="applayout__component">
        {React.cloneElement(children, {})}
      </div>
      <Footer/>
    </>
  );
};

export default AppLayer;
