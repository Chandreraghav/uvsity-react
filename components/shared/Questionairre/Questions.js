import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { CUSTOM_QUESTION_OPTS } from "../../../constants/questionairre";
import Spacer from "../Spacer";
class Question {
  constructor(isRemovable) {
    this.number = 1;
    (this.question = {
      val: "",
      required: true,
      maxlength: CUSTOM_QUESTION_OPTS.maxLength.default,
      removable: isRemovable,
    }),
      (this.answer = {
        selectedTypeCode: CUSTOM_QUESTION_OPTS.answer_types[0].value,
        required: true,
        typeCodeOpts: CUSTOM_QUESTION_OPTS.answer_types,
      });
  }
}
function Questions() {
  // make first question visible by default;
  const _question = new Question(false);
  const [questions, setQuestions] = useState([_question]);

  return (
    <div>
      <button
        title="Add custom questions"
        class="app__button app__button__block"
      >
        {CUSTOM_QUESTION_OPTS.icons.AddQuestion}
        Add Custom Questions
      </button>
      <Spacer />
      <div className="overflow-auto py-1 px-2 mb-2 max-h-44 border-2 rounded-md shadow-md bg-gray-300">
        {/* INITIAL MANDATORY CONTROLS */}
        <div>
          {/* QUESTION DESCRIPTION */}
          <FormControl
            variant="standard"
            sx={{ marginBottom: 1, marginTop: 1, width: "100%" }}
          >
            <TextField
              required
              placeholder="Description"
              variant="standard"
              label="Questionairre Description"
              id="questionairre-description"
            />
          </FormControl>
        </div>

        <div className="flex flex-col">
          <div className="ml-auto question-options">
            <span
              title="Add another question"
              class=" cursor-pointer app__anchor__block"
            >
              {CUSTOM_QUESTION_OPTS.icons.AddQuestion}
            </span>
          </div>
          {/* QUESTIONS ARRAY */}
          <div>
            {questions.map((question, index) => (
              <div className="flex gap-5 mb-2" key={index}>
                <FormControl sx={{ width: "80%" }} variant="standard">
                  <TextField
                    onChange={(e) => (question.question.val = e.target.value)}
                    required={question.question.required}
                    placeholder="Question"
                    variant="standard"
                    label="Question"
                    id="question"
                  />
                </FormControl>

                <FormControl variant="standard" sx={{ width: "15%" }}>
                  <InputLabel
                    required={question.answer.required}
                    id="select-answer-type"
                  >
                    Answer type
                  </InputLabel>
                  <Select
                    required={question.answer.required}
                    labelId="select-answer-type-label"
                    id="select-answer-type"
                    value={question.answer.selectedTypeCode}
                    onChange={(e) =>
                      (question.answer.selectedTypeCode = e.target.value)
                    }
                    variant="standard"
                    label="Answer type"
                  >
                    {question.answer.typeCodeOpts.map((options) => (
                      <MenuItem
                        className="block p-3"
                        key={options.id}
                        value={options.value}
                      >
                        {options.display}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
              
              sx={{  width: "5%" }}
            >
              <TextField
                variant="standard"
                label="Maxlength"
                id="max-length-number"
                type="number"
                required
                
                
              />
              
            </FormControl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
