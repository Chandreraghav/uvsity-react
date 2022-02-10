import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
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
function Questions({ onSave, onCancel }) {
  // make first question visible by default;
  const _question = new Question(false);
  const initialArray = [_question];
  const [questions, setQuestions] = useState(initialArray);
  const handleAdd = () => {
    const question = new Question(true);
    setQuestions([...questions, question]);
    setTimeout(() => {
      scrollDivToBottom("scrollable-question-div");
      window.scrollTo(0, document.body.scrollHeight);
    }, 150);
  };
  const handleRemove = (index) => {
    var array = [...questions]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      setQuestions(array);
    }
  };
  const removeAll = () => {
    var array = [...questions];
    array.length = 1;
    setQuestions(array);
  };
  const scrollDivToBottom = (div) => {
    var objDiv = document.getElementById(div);
    objDiv.scrollTop = objDiv.scrollHeight;
  };
  return (
    <div>
      <Spacer />
      {/* INITIAL MANDATORY CONTROLS */}
      <div className="flex gap-2">
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
        {questions.length > 0 && (
          <>
            <div className="flex ml-auto question-options gap-2 mt-4">
              <div onClick={handleAdd}>
                <span
                  title="Add another question"
                  class=" cursor-pointer app__anchor__block"
                >
                  {CUSTOM_QUESTION_OPTS.icons.AddQuestion}
                </span>
              </div>
              {questions.length > 1 && (
                <div onClick={removeAll}>
                  <span
                    title="Remove all questions"
                    class="cursor-pointer app__anchor__block"
                  >
                    {CUSTOM_QUESTION_OPTS.icons.RemoveQuestion}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div
        id="scrollable-question-div"
        className="scroll-smooth  overflow-auto py-1 px-2 mb-2 max-h-96 border-2 rounded-md shadow-md bg-gray-300"
      >
        <div className="flex flex-col">
          {/* QUESTIONS ARRAY */}

          {questions.map((question, index) => (
            <Box key={index} sx={{ width: "100%" }}>
              <Grid
                container
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item lg={6} xs={12}>
                  <div className="flex gap-2">
                    <div className="flex gap-1">
                      {question.question.removable && (
                        <>
                          <div
                            onClick={() => handleRemove(index)}
                            className="mt-4 question-options "
                          >
                            <span
                              title="Remove this question"
                              class=" cursor-pointer app__anchor__block"
                            >
                              {CUSTOM_QUESTION_OPTS.icons.RemoveQuestion}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="text-sm text-gray-600 mt-4">
                        Q#{index + 1}
                      </div>
                    </div>

                    <FormControl fullWidth variant="filled">
                      <TextField
                        onChange={(e) =>
                          (question.question.val = e.target.value)
                        }
                        required={question.question.required}
                        placeholder="Question"
                        variant="standard"
                        label="Question"
                        id="question"
                      />
                    </FormControl>
                  </div>
                </Grid>

                <Grid item lg={3} xs={12}>
                  <div className=" flex-col">
                    <div className=" flex gap-1 text-sm text-gray-600 font-normal">
                      <div>Answer type</div>
                    </div>
                    <FormControl fullWidth variant="filled">
                      <Select
                        required={question.answer.required}
                        labelId="select-answer-type-label"
                        id="select-answer-type"
                        value={question.answer.selectedTypeCode}
                        onChange={(e) =>
                          (question.answer.selectedTypeCode = e.target.value)
                        }
                        className="-mt-2"
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
                  </div>
                </Grid>
                <Grid item lg={3} xs={12}>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      variant="standard"
                      label="Maxlength"
                      id="max-length-number"
                      placeholder="Answer maxlength"
                      type="number"
                      required={question.question.required}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 3);
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Spacer count={2} />
            </Box>
          ))}
        </div>
      </div>

      <div className="save-questions-action-buttons border-dotted border-2">
        <Tooltip title={"Save questions"}>
          <IconButton aria-label="save-questions-done" size="small">
            <CheckCircleIcon color="primary" fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Cancel"}>
          <IconButton aria-label="save-questions-cancel" size="small">
            <CancelIcon fontSize="small" onClick={()=>onCancel('cancel')} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Questions;
