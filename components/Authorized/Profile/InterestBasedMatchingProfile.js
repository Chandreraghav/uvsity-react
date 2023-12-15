import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { NameTooltip } from '../Shared/NameTooltip';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    connectButton: {
        borderRadius: '20px',
        padding: '10px 20px',
        background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
          background: 'linear-gradient(to right, #ff4b2b, #ff416c)',
        },
      },
}));
function InterestBasedMatchingProfile({ img, name, designation, location, interests = [] }) {
    const classes = useStyles();
    return (
        <Card sx={{ maxWidth: 320, width: 320, flexShrink: 0, marginRight: 2, height: '100%', display: 'flex', flexDirection: 'column', maxHeight: 700, zIndex: 1 }}>
            <CardMedia
                component="img"
                alt={name}
                sx={{ objectPosition: 'center', height: '300px!important' }}
                image={img}
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                    <NameTooltip userId={0}>
                        {name}
                    </NameTooltip>
                </Typography>


                <Typography variant="body2" color="text.secondary">
                    <WorkIcon /> {designation}
                </Typography>
                <div style={{ margin: '10px' }}></div>
                <Typography variant="body2" color="text.secondary">
                    <LocationOnIcon /> {location}
                </Typography>
                <div style={{ margin: '10px' }}></div>
                {interests.length > 0 && (
                    <div className="flex overflow-x-auto scroll-smooth overflow-y-hidden gap-1 max-h-fit">
                        {interests.map((interest) => (
                            <Chip key={interest.id} label={`${interest.emoji} ${interest.label}`} />
                        ))}
                    </div>
                )}


                <div style={{ margin: '15px' }}></div>
                <Button startIcon={<PersonAddAltIcon />} variant='contained' color="inherit" className={classes.connectButton}>
                    <span className='mt-0.5'>Connect</span>
                </Button>
            </CardContent>

        </Card>
    );
}

export default InterestBasedMatchingProfile