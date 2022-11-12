import { Chip, Stack, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import NoData from "../../Shared/NoData";
import { USER_PROFILE } from "../../../../constants/userdata";
import { v4 as uuidv4 } from "uuid";
import UserDataService from "../../../../pages/api/users/data/UserDataService";
import { handleResponse } from "../../../../toastr-response-handler/handler";
import { RESPONSE_TYPES } from "../../../../constants/constants";
import { toast } from "react-toastify";
toast.configure();
function SkillSets(props) {

  const skillSets = props?.userSkillsets;
  const [userSkillsets, setUserSkillSets] = useState(props?.userSkillsets);
  useEffect(() => {
    setUserSkillSets(props?.userSkillsets);
    return () => {
      setUserSkillSets([]);
    };
  }, [props?.userSkillsets]);
  const [isUpdating, setUpdating] = useState(false)
 
  const [edit, setEdit] = useState(false);
  const ownerName = props?.skillSetOwnerFirstName;
  const handleSessionRequestBasedOnSkill = (skillSet) => {
    if (skillSet) {
      if (props.consumeEvent) {
        props.consumeEvent(skillSet, "SessionRequest");
      }
    }
  };
  const handleDelete = (skillset) => {
    try {
      const deleteIdx = userSkillsets.findIndex(
        (_skillset) => _skillset.skillSetId === skillset.skillSetId
      );
      if (deleteIdx !== -1) {
        let tempSkillSets = userSkillsets.slice();
        tempSkillSets.splice(deleteIdx, 1);
        setUserSkillSets(tempSkillSets);
      }
    } catch (error) {}
  };
  const handleSkillSetUpdate = () => {
    props.consumeEvent({
      id: 2,
      event: "init_edit",
      component: "SkillSets",
    });

    setEdit(true);
    setTimeout(() => {
      const editableElement = document.getElementById("add-skill");
      editableElement?.focus();
    }, 120);
  };
  const handleSkillSetUpdateOK = () => {
    let payloadArr = [];
    setUpdating(true)
    let skillsArr = userSkillsets.slice();
    skillsArr.map((skill) => {
      const obj = { userSkillSetName: skill.userSkillSetName };
      payloadArr.push(obj);
    });
    UserDataService.editSkills(payloadArr)
      .then((response) => {
        setUpdating(false)
        setEdit(false);
        skillsArr=skillsArr.sort((a, b) => a.userSkillSetName.localeCompare(b.userSkillSetName))
        setUserSkillSets(skillsArr);
        handleResponse(
          `${USER_PROFILE.SKILLS_UPDATED}`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.BOTTOM_CENTER
        );
      })
      .catch((error) => {
        setUpdating(false)
        setEdit(false);
        setUserSkillSets(skillSets);
        handleResponse(
          `${USER_PROFILE.SKILLS_UPDATE_FAILED}`,
          RESPONSE_TYPES.ERROR,
          toast.POSITION.BOTTOM_CENTER
        );
      });
  };
  const handleSkillSetUpdateCancel = () => {
    setEdit(false);
   // setUserSkillSets(skillSets);
  };
  const handleSkillUpdateEntry = (e) => {
    if (
      e.which === 13 ||
      e.code === "Enter" ||
      e.keyCode === 13 ||
      e.key === "Enter"
    ) {
      e.preventDefault();
      const obj = {
        skillSetId: uuidv4(),
        userSkillSetName: e.target.innerText,
      };
      const temp = userSkillsets.slice();
      temp.push(obj);
      setUserSkillSets(temp);
      setTimeout(() => {
        document.getElementById("add-skill").innerText = "";
        document.getElementById("add-skill").focus();
      }, 120);
    }
    return e.which != 13;
  };

  return (
    <div>
      {props?.owner && !edit && (
        <div
          onClick={() => handleSkillSetUpdate()}
          className=" text-sm dark:text-gray-500 text-gray-700  -mt-1 cursor-pointer ml-auto float-right"
        >
          <Tooltip title={USER_PROFILE.CHANGE_SKILLS}>
            <EditIcon fontSize="small" />
          </Tooltip>
        </div>
      )}
      {userSkillsets && userSkillsets.length > 0 ? (
        <>
          <div className="skillsets flex gap-2 flex-wrap dark:text-gray-500 text-gray-700">
            {userSkillsets?.map((skillset) => (
              <Stack
                key={skillset.skillSetId}
                className="cursor-pointer flex flex-wrap"
                direction="row"
                spacing={1}
              >
                {props.owner ? (
                  <>
                    {edit ? (
                      <Chip
                        disabled={isUpdating}
                        variant="outlined"
                        label={skillset.userSkillSetName}
                        color="primary"
                        onDelete={() => handleDelete(skillset)}
                      />
                    ) : (
                      <Chip
                        variant="outlined"
                        label={skillset.userSkillSetName}
                        color="primary"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <Tooltip
                      title={`Request ${ownerName} for a session on ${skillset.userSkillSetName}`}
                    >
                      <Chip
                        variant="outlined"
                        onClick={() =>
                          handleSessionRequestBasedOnSkill(skillset)
                        }
                        className="app-anchor-block "
                        label={skillset.userSkillSetName}
                        color="primary"
                      />
                    </Tooltip>
                  </>
                )}
              </Stack>
            ))}
            {edit && props?.owner && (
              <>
                <div
                  onKeyDown={handleSkillUpdateEntry}
                  data-placeholder="Add a skill"
                  id="add-skill"
                  contentEditable={true}
                  className=" text-sm mt-0.5 max-w-xs max-h-14 overflow-hidden outline-none whitespace-nowrap"
                ></div>
              </>
            )}
          </div>
        </>
      ) : (
       
       <>
       {!edit && <NoData message="There are no skill sets to show." />}
       {edit && props?.owner && (
              <>
                <div
                  onKeyDown={handleSkillUpdateEntry}
                  data-placeholder="Add a skill"
                  id="add-skill"
                  contentEditable={true}
                  className=" dark:text-gray-500 text-gray-700 text-sm mt-0.5 max-w-xs max-h-14 overflow-hidden outline-none whitespace-nowrap"
                ></div>
              </>
            )}
       </> 
      )}

      {edit && props?.owner && (
        <>
          <div className="flex gap-4 mt-2">
            <Button
             disabled={isUpdating}
              onClick={handleSkillSetUpdateOK}
              variant="outlined"
              size="small"
            >
              OK
            </Button>
            <Button
              disabled={isUpdating}
              variant="outlined"
              onClick={handleSkillSetUpdateCancel}
              size="small"
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default SkillSets;
