import React from "react";
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import { COLOR_CODES } from '../../../../constants';

const { DARK_BLUE_PALLETTE } = COLOR_CODES || {};
const { SECONDARY, PRIMARY, TERTIARY } = DARK_BLUE_PALLETTE || {};

const DefaultStyleByType = {
  textColor: PRIMARY,
  hoverTextColor: SECONDARY,
  textDecoration: 'none'
};

const TypeColorMap = {
  primary: DefaultStyleByType,
  secondary: {
    ...DefaultStyleByType,
    hoverTextColor: PRIMARY,
    textDecoration: 'underline'
  }
}

export const AppLink = ({ type="primary", variant="inherit", className, children, ...others }) => {
  const desiredStyle = TypeColorMap[type] || DefaultStyleByType;
  const { textColor, hoverTextColor, textDecoration } = desiredStyle;

  const useStyles = makeStyles({
    link: {
      color: textColor,
      "&:hover": {
        color: hoverTextColor,
        textDecoration
      }
    }
  });

  const classes = useStyles();

  return (
    <Link 
      variant={variant}
      underline="none" 
      color="inherit"
      className={`mr-2 cursor-pointer ${classes.link} new-font-family ${className}`}
      {...others}
    >
      {children}
    </Link>
  )
}
