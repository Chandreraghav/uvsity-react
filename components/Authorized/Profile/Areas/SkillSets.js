import { Chip, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";

function SkillSets(props) {
  const userSkillsets = props?.userSkillsets;
  const ownerName = props?.skillSetOwnerFirstName;
  const handleSessionRequestBasedOnSkill = () => {};
  return (
    <div>
      {userSkillsets && userSkillsets.length > 0 ? (
        <>
          <div className="skillsets flex gap-2 flex-wrap">
            {userSkillsets?.map((skillset) => (
              <Stack
                key={skillset.skillSetId}
                className="cursor-pointer flex flex-wrap"
                direction="row"
                spacing={1}
              >
                {props.owner ? (
                  <>
                    <Chip
                      variant="outlined"
                      
                      label={skillset.userSkillSetName}
                      color="primary"
                    />
                  </>
                ) : (
                  <>
                    <Tooltip
                      title={`Request ${ownerName} for a session on ${skillset.userSkillSetName}`}
                    >
                      <Chip
                        variant="outlined"
                        onClick={handleSessionRequestBasedOnSkill}
                        className="app__anchor__block "
                        label={skillset.userSkillSetName}
                        color="primary"
                      />
                    </Tooltip>
                  </>
                )}
              </Stack>
            ))}
          </div>
        </>
      ) : (
        <>No data</>
      )}
    </div>
  );
}

export default SkillSets;
