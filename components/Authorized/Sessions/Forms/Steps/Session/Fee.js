import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useState } from "react";
import { FEE, SPONSORSHIP } from "../../../../../../constants/userdata";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
function Fee() {
  const [freeSession, setSessionFree] = useState(true);
  const [sponsorShipReqd, setSponsorShipReqd] = useState(false);
  const [sessionFee, setSessionFee] = useState(null);
  return (
    <div className={`p-4`}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12}>
            <div className="flex gap-4 justify-center">
              <div className=" leading-loose lg:text-3xl text-xl md:text-3xl text-gray-700">
                Would you hold your session for free ?
              </div>
              <FormControl variant="filled">
                <FormControlLabel
                  className=" text-gray-600 py-2"
                  control={
                    <Switch
                      size="medium"
                      onChange={() => setSessionFree(!freeSession)}
                      checked={freeSession}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={
                    <>
                      <h3 className="lg:text-3xl text-xl md:text-3xl">Yes</h3>
                    </>
                  }
                />
              </FormControl>
            </div>
          </Grid>
          {!freeSession && (
            <>
              <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                  <Box
                    fullWidth
                    sx={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <AttachMoneyIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                    <TextField
                      id="session-fee"
                      label="Session fee"
                      variant="standard"
                      fullWidth
                      placeholder="Enter session fee"
                      value={sessionFee}
                      onChange={(e) => setSessionFee(e.target.value)}
                    />
                  </Box>
                </FormControl>
                <div className="text-blue-600 lg:text-xl text-xs md:text-sm leading-tight flex gap-2 px-3 py-1">
                  <div>{FEE.PROMO_CODES.icon}</div>
                  <div>{FEE.PROMO_CODES.text}</div>
                </div>

                {sessionFee && !isNaN(sessionFee) && sessionFee > 0 && (
                  <>
                    <div className="text-green-600 lg:text-xl text-xs md:text-sm leading-tight font-semibold flex gap-2 px-3 py-1">
                      <div>{FEE.HELP_TEXT.ICON}</div>
                      <div>
                        {FEE.HELP_TEXT.SET_FEE_TYPEWRITER.replace(
                          "#XX",
                          sessionFee
                        )}
                      </div>
                    </div>
                  </>
                )}
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <div className="flex gap-4 justify-center">
              <div className=" leading-loose lg:text-3xl text-xl md:text-3xl text-gray-700">
                Are you looking for sponsors ?
              </div>
              <FormControl variant="filled">
                <FormControlLabel
                  className=" text-gray-600 py-2"
                  control={
                    <Switch
                      size="medium"
                      checked={!sponsorShipReqd}
                      onChange={() => setSponsorShipReqd(!sponsorShipReqd)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={
                    <>
                      <h3 className="lg:text-3xl text-xl md:text-3xl">No</h3>
                    </>
                  }
                />
              </FormControl>
            </div>
          </Grid>

          {sponsorShipReqd && (
            <>
              {SPONSORSHIP.LEVELS.map((level) => (
                <Grid key={level.id} item lg={4} xs={12} sm={12} md={4}>
                  <Card className="" sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt={level.alias}
                      height="140"
                      image={level.image}
                    />
                    <CardContent>
                      <div className="flex">
                        <Typography gutterBottom variant="h5" component="div">
                          {level.alias}
                        </Typography>
                        <div className="ml-auto">
                          <Typography gutterBottom variant="h6" component="div">
                            {level.defaults.price.display}
                          </Typography>
                        </div>
                      </div>

                      <div>{level.defaults.featured.html}</div>
                    </CardContent>
                    <CardActions>
                      <Button size="small">{SPONSORSHIP.ICONS.EDIT}Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default Fee;
