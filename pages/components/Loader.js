import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Loader({ visible }) {
  if (!visible) return "";
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default Loader;
