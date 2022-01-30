import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Loader({ visible, custom, text, classes }) {
  if (!visible) return "";
  if (custom) {
    return (
      <div >
        <CircularProgress className={classes} />
      </div>
    );
  }
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default Loader;
