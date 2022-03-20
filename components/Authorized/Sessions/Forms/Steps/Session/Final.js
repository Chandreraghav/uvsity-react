import {
  Box,
  Divider,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import parse from "html-react-parser";
import FormHelperText from "@mui/material/FormHelperText";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import Profile from "../../../../Network/People/Dashboard/Profile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { getTimezone } from "../../../../../../utils/utility";
import VideocamIcon from "@mui/icons-material/Videocam";
import ReactPlayer from "react-player";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ArticleIcon from "@mui/icons-material/Article";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import PublicIcon from "@mui/icons-material/Public";
import SnapProfile from "../../../../Network/People/Listing/Snap/Profile";
import SessionStyle from "../../../../../../styles/Session.module.css";
import QuizIcon from "@mui/icons-material/Quiz";
import { SPONSORSHIP } from "../../../../../../constants/userdata";
import Plans from "../../../../Sponsorships/Plans";
import EditIcon from "@mui/icons-material/Edit";
function Final(props) {
  const [data, dispatch] = useDataLayerContextValue();
  console.log(data, props.data);
  return (
    <div className={`p-3`}>
      <Box sx={{ width: "100%" }}>
        <div className="flex gap-1">
          <div className="flex flex-col mt-1">
            <div className="lg:text-xl text-lg font-medium">20</div>
            <div className="lg:text-lg text-sm  text-gray-600">Mar</div>
          </div>
          <div className="flex flex-col">
            <Typography
              variant="h6"
              className=" line-clamp-1 leading-loose text-gray-800"
            >
              The Job Search Accelerator Masterclass — Kolkata
            </Typography>
            <div
              className="flex text-blue-600
           -mt-3 md:ml-auto lg:ml-auto app__anchor__block cursor-pointer"
            >
              <EditIcon className=" leading-3 font-semibold  text-sm" />
              <Typography variant="div" className=" text-xs leading-snug">
                Change
              </Typography>
            </div>
          </div>

          <div className={`ml-auto`}>
            <div
              className={`${SessionStyle.session__card__costing} ${SessionStyle.session__card__currency__amount}`}
            >
              Free
            </div>
          </div>
        </div>

        <Grid
          className="py-2"
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <div className="flex flex-col py-1">
              <img
                className=" relative block overflow-hidden  xl:h-48 lg:h-48  object-contain xl:object-cover lg:object-cover bg-gray-100 bg-center  rounded "
                src="https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
              <div className="flex ">
                <Profile
                  oid={props?.data?.user?.data?.userDetailsId}
                  options={{ connect: false, mixedMode: true }}
                  firstName={props?.data?.user?.data?.firstName}
                  lastName={props?.data?.user?.data?.lastName}
                  avatar={props?.data?.user?.data?.profilePicName}
                  userType={props?.data?.user?.data?.userType}
                  instituition={props?.data?.user?.data?.educationalInstitute}
                  metaData={props?.data?.user?.data}
                  userdata={props?.data?.user?.data}
                />
              </div>

              <div>
                <Typography
                  variant="div"
                  className="  font-normal line-clamp-3 text-sm mb-3  leading-snug text-black-600"
                >
                  {parse(` Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but a
              `)}
                </Typography>
              </div>
              <Divider></Divider>
              <div
                className={` flex flex-col   gap-2     border-0 p-2  shadow-sm bg-repeat-round rounded-lg  `}
              >
                <div className="text-md flex gap-2">
                  <CoPresentIcon className=" leading-3 font-semibold  text-xl text-gray-600" />{" "}
                  <span className="text-md leading-tight font-semibold text-gray-600">
                    Co-host
                  </span>
                  <div
                    className="flex text-blue-600
           ml-auto app__anchor__block cursor-pointer"
                  >
                    <EditIcon className=" leading-3 font-semibold  text-sm   " />
                    <Typography
                      variant="div"
                      className=" text-xs leading-snug "
                    >
                      Change
                    </Typography>
                  </div>
                </div>
                <div className="flex">
                  <SnapProfile
                    firstName={"Arvind"}
                    lastName={"Pattanayak"}
                    avatar={""}
                    oid={100}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 py-3">
                <div className="flex gap-1">
                  <AutoAwesomeOutlinedIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                  <Typography
                    variant="div"
                    className=" mb-1 font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                  >
                    Sponsorship Levels:
                  </Typography>

                  <div
                    className="flex mr-2 text-blue-600
           ml-auto app__anchor__block cursor-pointer"
                  >
                    <EditIcon className=" leading-3 font-semibold  text-sm   " />
                    <Typography
                      variant="div"
                      className=" text-xs leading-snug "
                    >
                      Change
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-2 -ml-5 lg:ml-0 md:ml-0">
                  {SPONSORSHIP?.LEVELS?.map((level) => (
                    <Plans showOnlyHeader={true} key={level.id} data={level} />
                  ))}
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <div className="flex flex-col gap-2 bg-gray-100 px-2 p-2 rounded-lg border-1 shadow-sm bg-repeat-round">
              <div className="flex gap-1">
                <ScheduleIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                <Typography
                  variant="div"
                  className="  font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                >
                  Schedule:
                </Typography>
                <Typography
                  variant="div"
                  className="  font-normal line-clamp-1 text-md  leading-tight  text-gray-800"
                >
                  Once
                </Typography>

                <div
              className="flex mr-2 text-blue-600
           ml-auto app__anchor__block cursor-pointer"
            >
              <EditIcon className=" leading-3 font-semibold  text-sm   " />
              <Typography
                variant="div"
                className=" text-xs leading-snug "
              >
                Change
              </Typography>
            </div>
              </div>
              <div>
                <div className="flex gap-1">
                  <DateRangeIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                  <Typography
                    variant="div"
                    className="  font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                  >
                    Effective:
                  </Typography>

                  <Typography
                    variant="div"
                    className="  font-normal line-clamp-1 text-md  leading-tight  text-gray-800"
                  >
                    Mar 19, 2022 - Mar 20, 2022
                  </Typography>
                </div>
              </div>
              <div className="flex gap-1">
                <PublicIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                <Typography
                  variant="div"
                  className="  font-semibold line-clamp-1 text-sm  leading-snug text-gray-600"
                >
                  Time:
                </Typography>

                <Typography
                  variant="div"
                  className="  font-normal line-clamp-1 text-sm  leading-tight  text-gray-800"
                >
                  21:00 - 21:30({getTimezone()})
                </Typography>

                <Tooltip title="Browse timezones">
                  <Typography
                    variant="div"
                    className=" app__anchor__block cursor-pointer font-normal line-clamp-1 text-sm  leading-tight  text-blue-600"
                  >
                    See other timezones
                  </Typography>
                </Tooltip>
              </div>
              <Divider></Divider>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <VideocamIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                  <Typography
                    variant="div"
                    className="  font-normal line-clamp-1 text-sm  leading-tight  text-gray-600"
                  >
                    <u>P</u>review
                  </Typography>{" "}

                  <div
              className="flex mr-2 text-blue-600
           ml-auto app__anchor__block cursor-pointer"
            >
              <EditIcon className=" leading-3 font-semibold  text-sm   " />
              <Typography
                variant="div"
                className=" text-xs leading-snug "
              >
                Change
              </Typography>
            </div>
                </div>
                <ReactPlayer
                  controls
                  loop={true}
                  muted
                  width="400px"
                  height="200px"
                  url={`https://www.youtube.com/watch?v=l8RyZc9o5Vo`}
                />

                <div className="flex gap-1">
                  <AttachmentIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                  <Typography
                    variant="div"
                    className="  font-normal line-clamp-1 text-sm  leading-tight  text-gray-600"
                  >
                    <u>A</u>ttachment
                  </Typography>{" "}
                </div>

                <div className="flex gap-1">
                  <ArticleIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                  <Typography
                    variant="div"
                    className="  app__anchor__block cursor-pointer font-normal line-clamp-1 text-sm  leading-tight  text-gray-600"
                  >
                    The business insider.txt
                  </Typography>{" "}
                </div>
              </div>
            </div>
            <div className=" border-dotted  py-1 mt-2 mb-2 flex flex-col gap-2 bg-gray-100 px-2 p-2 rounded-lg   shadow-sm bg-repeat-round">
              <div className="flex gap-1">
                <QuizIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                <Typography
                  variant="div"
                  className="  font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                >
                  Questionairre:
                </Typography>
                <Tooltip title="Questions that would be asked to your attendees before registration.">
                  <div className=" leading-3 font-semibold  text-xl text-gray-500 cursor-pointer">
                    <HelpOutlineIcon fontSize="small" />
                  </div>
                </Tooltip>
                <div
              className="flex mr-2 text-blue-600
           ml-auto app__anchor__block cursor-pointer"
            >
              <EditIcon className=" leading-3 font-semibold  text-sm   " />
              <Typography
                variant="div"
                className=" text-xs leading-snug "
              >
                Change
              </Typography>
            </div>
              </div>

              <div className="flex gap-1 font-normal line-clamp-3 text-sm   leading-snug text-black-700">
                <blockquote className="">
                  <u>P</u>lease answer the following questions
                </blockquote>
              </div>

              <div className="flex flex-col p-2 border-l-2">
                <div className="flex gap-1">
                  <div className="text-sm text-gray-800 font-semibold">1.</div>
                  <div className="text-sm text-gray-800 font-semibold">
                    What is there?
                  </div>
                  <div className="text-xs text-gray-600">(optional)</div>
                </div>
                <TextField
                  placeholder="Answer"
                  variant="standard"
                  label="Answer"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <FormHelperText className=" text-xs leading-tight text-gray-700 font-normal">
                  100
                </FormHelperText>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Final;
