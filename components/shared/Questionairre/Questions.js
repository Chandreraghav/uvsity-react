import { Tooltip } from '@mui/material';
import React from 'react';
import { CUSTOM_QUESTION_OPTS } from '../../../constants/questionairre';
import Spacer from '../Spacer'
function Questions() {
  return <div>
      
      <button title="Add custom questions" class='app__button app__button__block'>
          {CUSTOM_QUESTION_OPTS.icons.AddQuestion}
          Add Question
          </button>
     <Spacer/>
          <div className="overflow-auto py-4 max-h-44 border-2 rounded-md shadow-md bg-gray-300">

          </div>
     
    
  </div>;
}

export default Questions;
