import React, {useState, useEffect} from 'react'
import IntroStyles from '../../../styles/authorized.intro.module.css'
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { AuthGuardService } from '../../../auth-guard/service/AuthGuardService';
import { GREETING, INTRO_TEXT_KEYWORDS } from '../../../constants/userdata';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import { Tooltip } from '@mui/material';
import { randomKeyWord } from '../../../utils/utility';
function Intro() {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);
  const [introHeader, setIntroHeader] = useState(
    INTRO_TEXT_KEYWORDS[0]
  );
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());

  }, []);
  useEffect(() => {
    let controller = new AbortController();
    setInterval(() => {
        setIntroHeader(randomKeyWord(INTRO_TEXT_KEYWORDS));
    }, 60000);
    return () => {
      controller?.abort();
    };
  }, []);
  if (!loggedIn) {
    return "";
  }
    return (
        <div  className={IntroStyles.intro}>
            <h2>{GREETING.replace('<user>',USERDATA?.SUMMARY?.data?.firstName)}</h2>
            <header
        
        className={IntroStyles.intro__banner} style={{
            backgroundImage:`url('https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&fit=max&w=930')`,
            backgroundSize: 'cover',
            backgroundPosition: "center center",
            backgroundAttachment:"fixed",
            backgroundRepeat:"no-repeat",
            marginLeft:'1%',
            marginTop:'-50px',

        }}>

<div className={IntroStyles.intro__contents}>
<div className={IntroStyles.intro__title}>
     <h3>{introHeader}</h3>
 </div>
 
 <div className={IntroStyles.intro__buttons}>
 <Stack direction="row" spacing={2}>
      <Tooltip title='Create a new session'><Button variant="outlined" startIcon={<AddIcon />}>
        Session
      </Button>
      </Tooltip>
     <Button disabled variant="contained" endIcon={<CreateIcon />}>
        Discussion
      </Button>
     
    </Stack>
    </div>
</div>
 
 
            <div className={IntroStyles.intro__Fade__Bottom}></div>
        </header>

        </div>
    )
}

export default Intro
