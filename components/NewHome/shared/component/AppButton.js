import React from "react";
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { COLOR_CODES } from '../../../../constants';

const { DARK_BLUE_PALLETTE } = COLOR_CODES || {};
const { PRIMARY, SECONDARY, TEXT_PRIMARY_DARK, TEXT_PRIMARY, TERTIARY, TEXT_SECONDARY } = DARK_BLUE_PALLETTE || {};

const DefaultStyleByType = {
  bgColor: PRIMARY,
  textColor: TEXT_PRIMARY,
  bgHover: SECONDARY
};

const TypeColorMap = {
  primary: DefaultStyleByType
}

export const AppButton = ({ buttonType = "primary", children, className, ...others }) => {
  const desiredStyle = TypeColorMap[buttonType] || DefaultStyleByType;
  const { bgColor, textColor, bgHover } = desiredStyle;

  const useStyles = makeStyles({
    button: {
      backgroundColor: `${bgColor}!important`,
      color: textColor,
      "&:hover": {
        backgroundColor: `${bgHover}!important`
      }
    }
  });

  const classes = useStyles();

  return (
    <Button
      className={`app-button mr-2 cursor-pointer ${classes.button} new-font-family ${className}`}
      {...others}
    >
      {children}
    </Button>
  )
}
