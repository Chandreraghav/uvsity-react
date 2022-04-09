import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SPONSORSHIP } from "../../../constants/userdata";
import Popover from '@mui/material/Popover';

function Plans(props) {
  const editSponsorshipdata = (data) => {
    if (props.showOnlyHeader) {
      return;
    }
    if (props.editSponsorshipdata) {
      props.editSponsorshipdata(data);
    }
  };
  const resetSponsorShip = (data) => {
    if (props.showOnlyHeader) {
      return;
    }
    if (props.onResetSponsorShip) {
      props.onResetSponsorShip(data);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleFeaturePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFeaturePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Grid item lg={4} xs={12} sm={6} md={4}>
      <Card className="shadow-xl" sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={props.data.alias}
          height={100}
          image={props.data.image}
          style={{
            height: "40px",
          }}
        />
        <CardContent>
          <div className={`${props.showOnlyHeader ? "" : "flex"}`}>
            <Typography gutterBottom variant="h5" component="div">
              {props.showOnlyHeader ? props.data.alias : props.data.alias}
            </Typography>

            <div
              className={`${
                props.showOnlyHeader
                  ? "  text-gray-600 text-sm -mt-2"
                  : "ml-auto"
              }`}
            >
              <Typography gutterBottom variant="h6" component="div">
                $
                {props.data.current.price.text
                  ? props.data.current.price.text
                  : props.data.defaults.price.text}
              </Typography>
            </div>
          </div>
          {!props.showOnlyHeader && (
            <div>
              {props?.data?.current?.featured?.html
                ? props.data.current.featured.html
                : props.data.defaults.featured.html}
            </div>
          )}
          {props.showOnlyHeader && (
            <div>
              <Tooltip  title="See features of this plan">
                <div className=" cursor-pointer font-normal line-clamp-1 text-sm  leading-tight  text-blue-600" onClick={handleFeaturePopoverClick}>
                <VisibilityIcon />
                
                </div>
               
              </Tooltip>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleFeaturePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div className="p-2">
              {props?.data?.current?.featured?.html
                ? props.data.current.featured.html
                : props.data.defaults.featured.html}
            </div>
                 
              </Popover>
            </div>
          )}
        </CardContent>

        {!props.showOnlyHeader && (
          <CardActions>
            <Button
              onClick={() => editSponsorshipdata(props.data)}
              size="small"
            >
              {SPONSORSHIP.ICONS.EDIT}Edit
            </Button>

            {props.data.dirty && (
              <div class="ml-auto">
                <Tooltip title="Reset to default offering">
                  <Button
                    onClick={() => resetSponsorShip(props.data)}
                    size="small"
                  >
                    {SPONSORSHIP.ICONS.RESET}
                  </Button>
                </Tooltip>
              </div>
            )}
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}

export default Plans;
