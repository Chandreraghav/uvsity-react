import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SessionStyle from "../../../styles/Session.module.css";
import {avatarToString,localTZDate} from "../../../utils/utility"
import EventIcon from '@material-ui/icons/Event';
import SchoolIcon from '@material-ui/icons/School';
export default function SessionCard({data}) {
   

  return (
    <Card className={` ${SessionStyle.session__card} ${SessionStyle.session__card__darkgrey__variant} w-auto lg:w-96 mt-5 mb-5 ml-5 mr-5  
    shadow-3xl antialiased`}>
    <CardMedia
      component="img"
      height="200"
      image={data?.imageURL}
      alt={data?.courseFullName}
    />
    {/* <img alt={data?.courseFullName} src={data?.imageURL}/> */}
    <CardContent>
      <Typography className={`sm:line-clamp-1 lg:line-clamp-2 font-medium `} gutterBottom variant="h5" component="div">
       {data?.courseFullName}
      </Typography>
      <div className="flex flex-row">
<div>
  {/* avatar */}
  {data?.courseCreatorImageURL!=='' && 
  <Avatar alt={`${data.creator.firstName} ${data.creator.lastName}`} 
  src={data.courseCreatorImageURL}/>}
  {(data?.courseCreatorImageURL===''|| data?.courseCreatorImageURL==null) && 
  <Avatar {...avatarToString(`${data.creator.firstName} ${data.creator.lastName}`)} />}
 
</div>
<div className="flex flex-col -mt-2">
  {/* author name */}
  <div className="ml-2">
   <span className="lg:text-lg md:text-md sm:text-xs text-xs font-bold">{data.creator.firstName} {data.creator.lastName}</span> 
   </div>
  {/* profile info */}
  <div className="mb-2">
  <span className={`sm:line-clamp-1  ${SessionStyle.session__card__profile__subtitle}`}>
  <SchoolIcon className={SessionStyle.session__card__profile__icon}/>{data.creator.userType}, 
  {data.creator.educationalInstitute}</span> 
  </div>
  {/* starts on */}
  <div className="mb-2">
  <span className={`sm:line-clamp-1  ${SessionStyle.session__card__event__time__subtitle}`}>
    <EventIcon className={SessionStyle.session__card__event__icon}/>{localTZDate(data.courseStartDTime)}
  </span> 
    </div>
  </div>
        </div>
      <Typography variant="body2" color="text.secondary">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>

  );
}


