import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

function CreateSession(props) {
  console.log(props.data);
  return (
    <div className="px-4 bg-white">
      <div>
        <Typography variant="h6" component="div">
          {props.data.workflow.workflow.alias}
        </Typography>
      </div>
      <FormControl variant="standard" sx={{ marginBottom: 1, minWidth: 200 }}>
        <InputLabel id="select-category-label">Category</InputLabel>
        <Select
          labelId="select-category-label"
          id="select-category"
          value={""}
          label="Category"
        >
          {props.data.static.categories.map((category) => (
            <MenuItem value={category.courseCategoryId}>
              {category.courseCategoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CreateSession;
