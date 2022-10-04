import React, { useState } from "react";
import { CONNECTIONS } from "../../../../../../constants/userdata";
import Student from "./Student";
import Professor from "./Professor";
import Alumni from "./Alumni";
import AllConnections from "./AllConnections";
import Spacer from "../../../../../shared/Spacer";
import MiniFooter from "../../../../../shared/MiniFooter";
function Main(props) {
  const [showStudent, setShowStudent] = useState(
    props.filter === CONNECTIONS[0].title
  );
  const [showProfessor, setShowProfessor] = useState(
    props.filter === CONNECTIONS[1].title
  );
  const [showAlumni, setShowAlumni] = useState(
    props.filter === CONNECTIONS[2].title
  );
  const [showAll, setShowAll] = useState(props.filter === "all");

  return (
    <div>
      <div
        className=" min-h-screen  
    grid items-stretch grid-cols-12  
    gap-2 px-2 mx-auto xl:container md:gap-4 
    xl:grid-cols-8 2xl:px-5 "
      >
        <div className="z-40 col-span-12 md:pt-2 md:col-span-8 lg:col-span-8 xl:col-span-6">
          {showAll && <AllConnections />}
          {showStudent && <Student />}
          {showProfessor && <Professor />}
          {showAlumni && <Alumni />}
          <Spacer count={2} />
        </div>
        <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
          {/* Sidebar filter */}
          <h2>Sidebar filter</h2>
          <Spacer count={2} />
          <MiniFooter showOnSmallScreens />
          <Spacer count={2} />
        </div>
      </div>
    </div>
  );
}

export default Main;
