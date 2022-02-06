import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FileUpload from "../../../../../FileUploader/FileUpload";
import {
  SESSION_DOCUMENT,
  SESSION_POSTER,
} from "../../../../../../constants/userdata";
import Spacer from "../../../../../shared/Spacer";
import QuillEditor from "../../../../../Thirdparty/Editor/QuillEditor";
import ReactPlayer from "react-player";
import { isValidURL } from "../../../../../../utils/utility";

function Basic(props) {
  const [videoPreviewURL, setVideoPreviewURL] = useState("");
  const trackVideoPlayerUrlInput = (e) => {
    if (e.target.value && e.target.value.trim().length > 20 && isValidURL(e.target.value))
      setVideoPreviewURL(e.target.value);
      else setVideoPreviewURL('')
  };
  return (
    <div className={`p-2`}>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            {/* Category */}
            <FormControl
              fullWidth={true}
              variant="standard"
              sx={{ marginBottom: 1 }}
            >
              <InputLabel id="select-category-label">
                Choose a category
              </InputLabel>
              <Select
                labelId="select-category-label"
                id="select-category"
                value={""}
                label="Category"
              >
                {props?.data?.static?.categories?.map((category) => (
                  <MenuItem className=" block p-2" key={category.courseCategoryId} value={category.courseCategoryId}>
                    {category.courseCategoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={0.4}>
            <FormControl
              fullWidth={true}
              variant="standard"
              sx={{ marginBottom: 1 }}
            >
              <blockquote className=" text-xs lg:text-lg md:text-xs font-medium italic leading-loose text-gray-800 lowercase border-r-2 mt-3 -ml-2 items-center">
                OR&nbsp;
              </blockquote>
            </FormControl>
          </Grid>
          {props?.data?.root?.expiredCourses &&
            Object.values(props?.data?.root?.expiredCourses).length > 0 && (
              <Grid item xs={5.6}>
                {/* Choose from */}
                <FormControl
                  fullWidth={true}
                  variant="standard"
                  sx={{ marginBottom: 1 }}
                >
                  <InputLabel id="select-expired-session-label">
                    Choose from past sessions
                  </InputLabel>
                  <Select
                    labelId="select-expired-session-label"
                    id="select-expired-session"
                    value={""}
                    label="Choose from past sessions"
                  >
                    {props?.data?.root?.expiredCourses &&
                      Object.values(props?.data?.root?.expiredCourses).map(
                        (session) => (
                          <MenuItem className=" block p-2" key={session.courseId} value={session.courseId}>
                            {session.courseFullName}
                          </MenuItem>
                        )
                      )}
                  </Select>
                </FormControl>
              </Grid>
            )}
          <Grid item xs={12}>
            <Spacer />
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            {/* Full name */}
            <FormControl
              fullWidth={true}
              variant="standard"
              sx={{ marginBottom: 1 }}
            >
              <TextField variant="standard" required label="Full Name" id="fullName" />
            </FormControl>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            {/* Short name */}
            <FormControl
              fullWidth={true}
              variant="standard"
              sx={{ marginBottom: 1 }}
            >
              <TextField variant="standard" required label="Short Name" id="shortName" />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            {/* Summary */}
            {/* You are ready now to use Quill, using onChange, value , placeholder props */}

            <FormControl
              fullWidth={true}
              variant="standard"
              sx={{ marginBottom: 1 }}
            >
              <div className="flex gap-1">
                <label
                  className=" text-gray-600 font-normal"
                  id="session-summary"
                >
                  Summary
                </label>
                <small className="text-blue-800 text-bold">*</small>
              </div>

              <QuillEditor />
            </FormControl>
          </Grid>

          <Grid item sm={6} lg={3} md={3} xs={12}>
            {/* Poster Upload */}
            <FormControl
              fullWidth={true}
              variant="standard"
              sx={{ marginBottom: 1 }}
            >
              <FileUpload data={SESSION_POSTER} />
            </FormControl>
          </Grid>

          <Grid item sm={6} lg={3} md={3} xs={12}>
            {/* Document Upload */}
            <FormControl
              fullWidth={true}
              variant="standard"
              sx={{ marginBottom: 1 }}
            >
              {" "}
              <FileUpload data={SESSION_DOCUMENT} />
            </FormControl>
          </Grid>

          <Grid className="mt-1" item sm={12} lg={6} md={6} xs={12}>
            <div className="flex flex-col">
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                  {/* Video URL */}
                <TextField
                  onBlur={(e) => trackVideoPlayerUrlInput(e)}
                  label="Video Preview URL"
                  variant="standard"
                  id="previewurl"
                />
              </FormControl>
              {videoPreviewURL.length > 0 && isValidURL(videoPreviewURL) && (
                <ReactPlayer
                  controls
                  loop={true}
                  muted
                  width="400px"
                  height="200px"
                  url={videoPreviewURL}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Box>

      
    </div>
  );
}

export default Basic;
