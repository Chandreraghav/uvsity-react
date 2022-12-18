import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Spacer from '../../../../shared/Spacer'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { WORKFLOW_CODES } from '../../../../../constants/workflow-codes';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CONNECTIONS } from '../../../../../constants/userdata';
import { THEME_MODES, useTheme } from '../../../../../theme/ThemeProvider';
import { makeStyles } from "@material-ui/core/styles"
import FilterForm from './FilterForm';
import AppButton from '../../../../shared/AppButton';

function Sidebar(props) {
  const [isSticky, setSticky] = useState(false);
  const [ctxTheme, dispatch] = useTheme();
  const [isDark, setDark] = useState(ctxTheme.mode === THEME_MODES.DARK);
  const [showMoreFilter, setShowMoreFilter] = useState(false)
  const [connectionsCategory, setConnectionsCategory] = useState(CONNECTIONS)
  useEffect(() => {
    setDark(ctxTheme.mode === THEME_MODES.DARK);
  }, [ctxTheme]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollheightLimit = 200;
      if (window.scrollY > scrollheightLimit) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
    return () => {
      try {
        window.removeEventListener("scroll");
      } catch (error) { }
    };
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiSvgIcon-root": {
        fontSize: '1.4rem',
      },
    },

    disabled: {
      '& .Mui-disabled': {
        color: isDark ? 'grey' : 'inherit',

      },
    },
  }));
  const classes = useStyles();
  const handleAppButtonClick = (obj) => {
    if (obj) {
      setShowMoreFilter(!showMoreFilter)
    }
  }
  const handleApplyFilter = (data) => {
    if (data) {
      sendFilterDataEventToParent(data);
    }
    if(!data){
      if (props.workflow !== WORKFLOW_CODES.PEOPLE.MY_CONNECTIONS )
      {
        const tempCategory = connectionsCategory.slice();
        tempCategory.map((category)=>category.selected=false)
        setShowMoreFilter(false)
        sendFilterDataEventToParent(null,true);
      }
      
    }
  }

  useEffect(() => {
    if (props.workflow === WORKFLOW_CODES.PEOPLE.PROFILE_VIEW) {
      const tempCategory = connectionsCategory.slice()
      tempCategory.map((category) => {
        category.hidden = false
        category.selected = false
      })
      setConnectionsCategory(tempCategory)
      return
    }

    if (props.workflow === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING) {
      const tempCategory = connectionsCategory.slice()
      tempCategory[tempCategory.length - 1].hidden = true;
      tempCategory[tempCategory.length - 2].hidden = false;
      setConnectionsCategory(tempCategory)
      return
    }

    if (props.workflow === WORKFLOW_CODES.PEOPLE.MY_CONNECTIONS) {
      const tempCategory = connectionsCategory.slice()

      tempCategory.map((category, idx) => {

        if (props.selectedCategory && category.title === props.selectedCategory) {
          category.selected = true;
          category.hidden = true;
        }
        else {
          if (category.id == 4 || category.id == 5) {
            category.selected = category.id == 5;
            category.hidden = true;
          }
          else {
            category.selected = false;
            category.hidden = false;
          }

        }

      })
      setConnectionsCategory(tempCategory)
      return
    }

  }, [])
  const handleConnectionCategorySelection = (e, index) => {
    const tempCategory = connectionsCategory.slice()
    tempCategory[index].selected = e.target.checked
    setConnectionsCategory(tempCategory)
    if (props.onDataEvent) {
      sendFilterDataEventToParent(); // if more filter is not visible on DOM, then send filter data immediately to parent.
    }
  }

  const sendFilterDataEventToParent = (filterData,resetRequest) => {
    const categoryData = {
      "isOnlyFriendsRequired": false,
      "inMyNetworkFilterCriteria": connectionsCategory[4].selected,
      "professors": connectionsCategory[1].selected,
      "students": connectionsCategory[0].selected,
      "awaitingResponseFilterCriteria": connectionsCategory[3].selected,
      "alumni": connectionsCategory[2].selected
    };
    let filterObj = null
    if (filterData) {
      filterObj = {
        educationalInstitutionFullName: filterData.educationalInstitutionFullName,
        specialization: filterData.specialization,
        educationalInstitutionCampus: filterData.educationalInstitutionCampus,
        countryFullName: filterData.countryFullName,
        cityFullName: filterData.cityFullName
      }
    }
    const obj = {
      filterData: filterObj,
      categoryData,
      resetRequest
    };
    props.onDataEvent(obj);
    window.scrollTo(0, 0)
  }

  return (
    <div className={`px-4  ${isSticky
      ? "md:sticky  lg:sticky  xl:sticky top-12  "
      : ""
      }`}>
      <Spacer count={3} />
      <div
        className={`uvsity__card  uvsity__card__border__theme `}
      >
        <Typography className="dark:text-gray-200 flex  text-gray-900" variant="subtitle2">
          <FilterAltIcon />
          <p className="first-letter:underline"> Refine Results</p>  </Typography>
        <Spacer />
        <>
          {connectionsCategory.map((connection, idx) => (<div
            className={`${connection.hidden ? 'cursor-not-allowed pointer-events-none' : ''} text-xs text-gray-800 dark:text-gray-500`} key={connection.id}>
            <FormControlLabel
              classes={{
                root: classes.root,
                label: classes.label,
                disabled: classes.disabled
              }}
              sx={{ color: connection.hidden === true ? 'gray' : 'inherit' }}
              control={
                <Checkbox
                  sx={{
                    "&:hover": {
                      background: '#E01EE8',
                      boxShadow: 3
                    },
                    color: connection.hidden === true ? 'gray' : '#0081CB'
                  }}
                  onChange={(e) => handleConnectionCategorySelection(e, idx)}
                  checked={connection.selected}
                  size="small"
                />
              }
              label={connection.title}
              labelPlacement="end"
            />
          </div>))}

          {props.workflow !== WORKFLOW_CODES.PEOPLE.MY_CONNECTIONS && (<>

            {!showMoreFilter && (<div className="flex space-x-2 py-2 justify-center">
              <AppButton event={handleAppButtonClick} ripple color={isDark ? THEME_MODES.DARK : THEME_MODES.LIGHT} label="More" />
            </div>)}

            {showMoreFilter && <FilterForm onApplyFilter={handleApplyFilter} />}

          </>)}
        </>
      </div>
    </div>
  )
}

export default Sidebar


