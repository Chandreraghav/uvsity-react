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
import { SPONSORSHIP } from "../../../constants/userdata";

function Plans(props) {
  const editSponsorshipdata = (data) => {
    if (props.editSponsorshipdata) {
      props.editSponsorshipdata(data);
    }
  };
  const resetSponsorShip=(data)=>{
    if (props.onResetSponsorShip) {
      props.onResetSponsorShip(data);
    }
  }
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
          <div className="flex">
            <Typography gutterBottom variant="h5" component="div">
              {props.data.alias}
            </Typography>
            <div className="ml-auto">
              <Typography gutterBottom variant="h6" component="div">
                $
                {props.data.current.price.text
                  ? props.data.current.price.text
                  : props.data.defaults.price.text}
              </Typography>
            </div>
          </div>

          <div>
            {props?.data?.current?.featured?.html
              ? props.data.current.featured.html
              : props.data.defaults.featured.html}
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={() => editSponsorshipdata(props.data)} size="small">
            {SPONSORSHIP.ICONS.EDIT}Edit
          </Button>

          {props.data.dirty && (
            <div class='ml-auto'>
              <Tooltip title="Reset to default offering"><Button onClick={() => resetSponsorShip(props.data)} size="small">{SPONSORSHIP.ICONS.RESET}</Button></Tooltip>
           
            </div>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Plans;
