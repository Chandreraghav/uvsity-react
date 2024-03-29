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
import { parseMarkdownToHTML } from "../../../utils/utility";

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
      <Card className="  bg-gray-100 dark:bg-gray-950 shadow-xl" sx={{ maxWidth: 345, }}>
        <CardMedia
          component="img"
          alt={props.data.alias}
          height={100}
          image={props.data.image}
          style={{
            height: "40px",
          }}
        />
        <CardContent sx={{ minHeight: props.showOnlyHeader ? 'auto' : 300, maxHeight: props.showOnlyHeader ? 'auto' : 300 }} className=" overflow-auto">
          <div className={`${props.showOnlyHeader ? "" : "flex"}`}>
            <Typography className=" dark:text-gray-400" gutterBottom variant="h5" component="div">
              {props.showOnlyHeader ? props.data.alias : props.data.alias}
            </Typography>

            <div
              className={`${props.showOnlyHeader
                ? "  text-gray-600 text-sm -mt-2"
                : "ml-auto"
                }`}
            >
              <Typography className="text-gray-600" gutterBottom variant="h6" component="div">
                $
                {props.data.current.price.text
                  ? props.data.current.price.text
                  : props.data.defaults.price.text}
              </Typography>
            </div>
          </div>
          {!props.showOnlyHeader && (
            <Typography variant="caption" className="leading-loose text-sm text-gray-600">
              {props?.data?.current?.featured?.html?.props?.children ? parseMarkdownToHTML(props?.data?.current?.featured?.html?.props?.children) : props.data.defaults.featured.html}

            </Typography>
          )}
          {props.showOnlyHeader && (
            <div>
              <Tooltip title="See features of this plan">
                <div className=" cursor-pointer font-normal line-clamp-1 text-sm  leading-tight  text-blue-600" onClick={handleFeaturePopoverClick}>
                  <VisibilityIcon color="primary" />

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


                {props?.showOnlyHTML && (<div className=" dark:bg-gray-dark text-gray-400 p-2">
                  {parseMarkdownToHTML(props?.data?.current?.featured?.html)}
                </div>)}
                {!props.showOnlyHTML && (<div className=" dark:bg-gray-dark text-gray-400 p-2">
                  {props?.data?.current?.featured?.html?.props?.children ? parseMarkdownToHTML(props?.data?.current?.featured?.html?.props?.children) : props.data.defaults.featured.html}
                </div>)}



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
              <div className="ml-auto">
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
