import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Overlay({ open,message,icon }) {
  if (!open) return "";
  return (
    <>
      {" "}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        {icon ? icon : (<CircularProgress color="inherit" />)}
        {message && <p>{message}</p>}
      </Backdrop>
    </>
  );
}

export default Overlay;
