import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
function Hamburger({color}) {
  return (
    <div className="md:hidden flex items-center mr-2 ">
      <MenuIcon className={`text-${color}-500 cursor-pointer`} />
    </div>
  );
}

export default Hamburger;
