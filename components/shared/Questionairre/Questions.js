import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useState } from "react";
import { CUSTOM_QUESTION_OPTS } from "../../../constants/questionairre";
import Spacer from "../Spacer";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { questionValidationSchema } from "../../../validation/services/auth/ValidationSchema";

class Question {
  constructor(isRemovable) {
    this.number = 1;
    this.question = {
      val: "",
      required: true,
      removable: isRemovable,
      questionnaireType: 1,
      maxRating: 0,
      options: [],
    };
    this.answer = {
      selectedTypeCode: CUSTOM_QUESTION_OPTS.answer_types[0].value,
      required: true,
      typeCodeOpts: CUSTOM_QUESTION_OPTS.answer_types,
      maxlength: CUSTOM_QUESTION_OPTS.maxLength.default,
    };
  }
}
class Option {
  constructor(isRemovable) {
    this.optionNumber = 1;
    this.option = {
      val: "",
      required: true,
      removable: isRemovable,
    };
  }
}
function Questions({ onCancel }) {
  // make first question visible by default;
  const _question = new Question(false);
  const initialArray = [_question];
  const [questions, setQuestions] = useState(initialArray);
  const [questionaireDescription, setQuestionairreDescription] = useState("");
  const handleAdd = () => {
    const question = new Question(true);
    question.number = questions.length + 1;
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
  const setSelectedAnswerTypeCode = (index, value) => {
    var array = [...questions];
    if (index !== -1) {
      array[index].question.options[index] = new Option(false);
      array[index].question.options[index + 1] = new Option(false);
      array[index].answer.selectedTypeCode = value;
    }
    setQuestions(array);
  };
  const getSelectedAnswerTypeCode = (index) => {
    if (index !== -1) return questions[index].answer.selectedTypeCode;
    return 1;
  };
  const setAnswerMaxLength = (index, value) => {
    var array = [...questions];
    if (index !== -1) {
      array[index].answer.maxlength = value;
    }
    setQuestions(array);
  };
  const getAnswerMaxLength = (index) => {
    if (index !== -1) return questions[index].answer.maxlength;
    return "";
  };
  const setQuestionText = (index, value) => {
    var array = [...questions];
    if (index !== -1) {
      array[index].question.val = value;
    }
    setQuestions(array);
  };
  const setOptionText = (option, index, optIndex, value) => {
    var array = [...questions];
    if (index !== -1 && optIndex !== -1) {
      array[index].question.options[optIndex].option.val = value;
    }
    setQuestions(array);
  };
  const getOptionText = (index, optIndex) => {
    if (index !== -1)
      return questions[index].question.options[optIndex].option.val;
    return "";
  };
  const getQuestionText = (index) => {
    if (index !== -1) return questions[index].question.val;
    return "";
  };
  const removeAll = () => {
    var array = [...questions];
    array.length = 1;
    setQuestions(array);
  };

  const handleRemoveOption = (index, optIndex) => {
    var array = [...questions];
    array[index].question.options.splice(optIndex, 1);
    setQuestions(array);
  };

  const scrollDivToBottom = (div) => {
    var objDiv = document.getElementById(div);
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  const handleAddOption = (question, index) => {
    const option = new Option(true);
    var array = [...questions];
    array[index].question.options[question?.question.options?.length] = option;
    setQuestions(array);
    setTimeout(() => {
      scrollDivToBottom("scrollable-question-div");
      window.scrollTo(0, document.body.scrollHeight);
    }, 150);
  };

  const formOptions = { resolver: yupResolver(questionValidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    data.questions.map((question, index) => {
      question.number = index + 1;
      question.answerTypeCode = Number(question.answerType);
      question.maxRating = 0;
      question.optional = true;
      if (question.options) {
        question.options = question.options
          .filter((opt) => opt)
          .map((a) => a.option);
        question.maxLength = 0;
      } else {
        question.options = null;
      }
    });
    data.questionnaireType = 1;

    // now call API to create the questions.
  }

  return (
    <div>
      <Spacer />
      {/* INITIAL MANDATORY CONTROLS */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          {/* QUESTION DESCRIPTION */}
          <FormControl
            variant="standard"
            sx={{ marginBottom: 1, marginTop: 1, width: "100%" }}
          >
            <TextField
              name="description"
              {...register("description")}
              helperText={errors.description?.message}
              error={errors.description?.message}
              variant="standard"
              label="Questionairre Description"
              value={questionaireDescription}
              onChange={(e) => setQuestionairreDescription(e.target.value)}
            />
          </FormControl>
          {questions.length > 0 && (
            <>
              <div className="flex ml-auto question-options gap-2 mt-4">
                <div onClick={handleAdd}>
                  <span
                    title="Add another question"
                    className=" cursor-pointer app__anchor__block"
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
                        {question?.question?.removable && (
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
                          helperText={
                            errors.questions?.[index]?.question?.message
                          }
                          error={errors.questions?.[index]?.question?.message}
                          variant="standard"
                          label="Question"
                          name={`questions[${index}]question`}
                          value={getQuestionText(index)}
                          {...register(`questions.${index}.question`, {
                            onChange: (event) => {
                              setQuestionText(index, event.target.value);
                            },
                          })}
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
                          labelId="select-answer-type-label"
                          className="-mt-2"
                          variant="standard"
                          value={getSelectedAnswerTypeCode(index)}
                          label="Answer type"
                          name={`questions[${index}]answerType`}
                          {...register(`questions.${index}.answerType`, {
                            onChange: (event) => {
                              setSelectedAnswerTypeCode(
                                index,
                                event.target.value
                              );
                            },
                          })}
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
                    {question?.answer.selectedTypeCode === 1 && (
                      <>
                        <FormControl fullWidth variant="filled">
                          <TextField
                            variant="standard"
                            label="Maxlength"
                            type="number"
                            value={getAnswerMaxLength(index)}
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                              )
                                .toString()
                                .slice(0, 3);
                            }}
                            name={`questions[${index}]maxLength`}
                            {...register(`questions.${index}.maxLength`, {
                              onChange: (event) => {
                                setAnswerMaxLength(index, event.target.value);
                              },
                            })}
                            helperText={
                              errors.questions?.[index]?.maxLength?.message
                            }
                            error={
                              errors.questions?.[index]?.maxLength?.message
                            }
                          />
                        </FormControl>
                      </>
                    )}
                  </Grid>

                  {isOptionalAnswer(question) &&
                    question.question.options.length > 0 && (
                      <>
                        <Grid item xs={12}>
                          <div className=" flex gap-1 text-sm text-gray-600 mt-4 font-normal">
                            <div className="text-lg">
                              <u>O</u>ptions
                            </div>

                            <div className="flex ml-auto question-option-options gap-2">
                              <div
                                onClick={() => handleAddOption(question, index)}
                              >
                                <span
                                  title="Add another option"
                                  class=" cursor-pointer app__anchor__block"
                                >
                                  {CUSTOM_QUESTION_OPTS.icons.AddQuestion}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </>
                    )}

                  {isOptionalAnswer(question) &&
                    question.question.options.map((option, optIndex) => (
                      <Grid item lg={4} xs={12}>
                        <div className="flex gap-3 -mt-3 ">
                          <div className="text-sm text-gray-600 mt-4">
                            Opt#{index + 1}.{optIndex - index + 1}
                          </div>
                          <FormControl fullWidth variant="filled">
                            <TextField
                              fullWidth
                              value={getOptionText(index, optIndex)}
                              name={`questions[${index}]options[${optIndex}]option`}
                              {...register(
                                `questions.${index}.options.${optIndex}.option`,
                                {
                                  onChange: (event) => {
                                    setOptionText(
                                      option,
                                      index,
                                      optIndex,
                                      event.target.value
                                    );
                                  },
                                }
                              )}
                              helperText={
                                errors.questions?.[index]?.options?.[optIndex]
                                  ?.option?.message
                              }
                              error={
                                errors.questions?.[index]?.options?.[optIndex]
                                  ?.option?.message
                              }
                              variant="standard"
                              label="Option"
                            />
                          </FormControl>
                          <div className="flex ml-auto">
                            {option.option.removable && (
                              <div
                                onClick={() =>
                                  handleRemoveOption(index, optIndex, option)
                                }
                                className="mt-4 question-option-options "
                              >
                                <span
                                  title="Remove this option"
                                  class=" cursor-pointer app__anchor__block"
                                >
                                  {CUSTOM_QUESTION_OPTS.icons.RemoveQuestion}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Grid>
                    ))}
                </Grid>
                <Spacer count={2} />
              </Box>
            ))}
          </div>
        </div>

        <div className="save-questions-action-buttons border-dotted border-2">
          <Tooltip title={"Save questions"}>
            <IconButton
              type="submit"
              aria-label="save-questions-done"
              size="small"
            >
              <CheckCircleIcon color="primary" fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Cancel"}>
            <IconButton aria-label="save-questions-cancel" size="small">
              <CancelIcon fontSize="small" onClick={() => onCancel("cancel")} />
            </IconButton>
          </Tooltip>
        </div>
      </form>
    </div>
  );

  function isOptionalAnswer(question) {
    const x = [2, 3, 4, 5].findIndex(
      (number) => number === question?.answer.selectedTypeCode
    );
    return x !== -1;
  }
}

export default Questions;
