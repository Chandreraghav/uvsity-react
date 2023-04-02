import React, {useState, useEffect,useCallback} from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { CONNECTIONS, TOOLTIPS } from "../../../../constants/userdata";
import { Avatar, Tooltip, Typography } from "@mui/material";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import { blue } from "@mui/material/colors";
import { navigateToPath } from "../../Shared/Navigator";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { AUTHORIZED_ROUTES } from "../../../../constants/routes";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
function ProfileStats(props) {
  const [ctxUserdata, dispatch] = useDataLayerContextValue();

  const [userdata, setUserdata]= useState({})
  const [statHeaderTitle, setStatHeaderTitle]= useState(null)
  const [statTooltip, setStatTooltip]= useState(null)
  const [isLoggedInUserOwner, setLoggedInUserAsOwner]= useState(false)

  useEffect(()=>{
    setUserdata(props.userdata)
    setLoggedInUserAsOwner(isItMe())
    setStatTooltip(isItMe()?TOOLTIPS.VIEW_ALL_CONNECTIONS:`${TOOLTIPS.VIEW_ALL_CONNECTIONS} of ${props?.userdata?.firstName}`)
    setStatHeaderTitle(isItMe()?'My connections':`${props?.userdata?.firstName}'s connections`)
  },[isItMe, props.userdata])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isItMe = useCallback(() => {
    return userdata?.userDetailsId === ctxUserdata?.userdata?.userDetailsId;
  });
  const router = useRouter();
  const getCount = (type) => {
    if (!type) return 0;
    switch (type) {
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.ALUMNI:
        return props?.userdata?.noOfAlumniCOnnections;
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.STUDENT:
        return props?.userdata?.noOfStudentConnections;
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.PROFESSOR:
        return props?.userdata?.noOfProfessorConnections;
      default:
        return 0;
    }
  };
  const navigate=(connection=null)=>{
   if(isItMe()){
    if(connection){
      navigateToPath(
        router,
        AUTHORIZED_ROUTES.AUTHORIZED.PEOPLE.INDEX,
        { utrn: AUTHORIZED_ROUTES.AUTHORIZED.UTRN.CONNECTIONS, filter: connection.title, token: uuidv4(),uid:null ,title:'My connections',owner:true}
      )
      return
    }
    navigateToPath(
      router,
      AUTHORIZED_ROUTES.AUTHORIZED.PEOPLE.INDEX,
      { utrn: AUTHORIZED_ROUTES.AUTHORIZED.UTRN.CONNECTIONS, token: uuidv4(), uid:null, title:'My connections', owner:true}
    )
    return
   }
    if(connection){
      navigateToPath(
        router,
        AUTHORIZED_ROUTES.AUTHORIZED.PEOPLE.INDEX,
        { utrn: AUTHORIZED_ROUTES.AUTHORIZED.UTRN.CONNECTIONS, token: uuidv4(), filter: connection.title,uid:props.userdata?.userDetailsId, title:statHeaderTitle, owner:isLoggedInUserOwner}
      )
      return
    }
    navigateToPath(
      router,
      AUTHORIZED_ROUTES.AUTHORIZED.PEOPLE.INDEX,
      { utrn: AUTHORIZED_ROUTES.AUTHORIZED.UTRN.CONNECTIONS, token: uuidv4(), uid:props.userdata?.userDetailsId, title:statHeaderTitle, owner:isLoggedInUserOwner}
    )
  }
   return (
    <div className="flex flex-col gap-3 lg:flex lg:flex-row 2xl:flex 2xl:flex-row xl:flex xl:flex-row md:flex md:flex-row lg:gap-4 md:gap-4 xl:gap-4 2xl:gap-8  ">
      <Tooltip title={statTooltip}>
        <div onClick={() => navigate()} className="app-anchor-block cursor-pointer flex gap-1">
          <Typography
            className="flex gap-1 text-gray-600 font-normal"
            variant="div"
          >
            <SupervisorAccountIcon
              className="mt-0.5"
              sx={{ color: blue[400] }}
            />

            <span>
              <u>C</u>onnections
            </span>
          </Typography>
        </div>
      </Tooltip>
      <>
        <div className="flex gap-x-3 sm:gap-x-3 lg:gap-x-8 xl:gap-x-8  md:gap-x-4 ">
          {CONNECTIONS.filter((hidden) => hidden !== true).map(
            (connection) =>
              getCount(connection.code) > 0 && (
                <div onClick={() => navigate(connection)} key={connection.id}>
                  <Tooltip
                    title={`${getCount(
                      connection.code
                    )} ${connection.title.toLowerCase()}`}
                  >
                    <div
                      className={`flex gap-x-2 sm:gap-x-3 lg:gap-x-2 xl:gap-x-2  md:gap-x-2 cursor-pointer text-sm items-center justify-center`}
                    >
                      <Avatar
                        sx={{ bgcolor: blue[500] }}
                        className="ml-auto  avatar-2xs"
                        alt={getCount(connection.code).toString()}
                      >
                        <span className=" justify-center items-center">
                          {" "}
                          {getCount(connection.code)}
                        </span>
                      </Avatar>
                      <div className=" text-xs ml-auto sm:text-xs  lg:text-base xl:text-base text-gray-500 font-normal line-clamp-1 ">
                        <Typography
                          className="  app-anchor-block "
                          variant="div"
                        >
                          {connection.title}
                        </Typography>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              )
          )}
        </div>
      </>
    </div>
  );
}

export default ProfileStats;
