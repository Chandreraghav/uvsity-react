import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useEffect, useState } from "react";
import { CUSTOM_QUESTION_OPTS } from "../../../constants/questionairre";
import Switch from "@mui/material/Switch";
import Spacer from "../Spacer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { questionValidationSchema } from "../../../validation/services/auth/ValidationSchema";
import QuestionairreService from "../../../pages/api/session/QuestionairreService";
import { handleResponse } from "../../../toastr-response-handler/handler";
import { getWorkflowError } from "../../../error-handler/handler";
import { RESPONSE_TYPES } from "../../../constants/constants";
import { toast } from "react-toastify";
import { SESSION_ERROR } from "../../../constants/error-messages";
import { PARTICIPANT_QUESTIONAIRRES } from "../../../constants/userdata";
toast.configure();
class Question {
  constructor(isRemovable) {
    this.number = 1;
    this.question = {
      val: "",
      required: true,
      removable: isRemovable,
      questionnaireType: 1,
      maxRating: 0,
      optional:true,
      options: [],
    };
    this.answer = {
      selectedTypeCode: CUSTOM_QUESTION_OPTS.answer_types[0].value,
      required: true,
      typeCodeOpts: CUSTOM_QUESTION_OPTS.answer_types,
      maxlength: CUSTOM_QUESTION_OPTS.maxLength.default,
    };
  }
  buildDataOptions = (options) => {
    let optsArr = [];
    options.map((option, index) => {
      const o = new Option();
      o.buildOptions(index > 1 ? true : false, option, index + 1, true);
      optsArr.push(o);
    });
    return optsArr;
  };
  buildQuestions(isRemovable, data, editMode) {
    this.number = data.number;
    this.question = {
      val: data.question,
      required: true,
      optional:data.optional,
      removable: isRemovable,
      questionnaireType: data.questionnaireType,
      maxRating: data.maxRating,
      options: data.options ? this.buildDataOptions(data.options) : null,
    };
    this.answer = {
      selectedTypeCode: Number(data.answerTypeCode),
      required: true,
      typeCodeOpts: CUSTOM_QUESTION_OPTS.answer_types,
      maxlength: data.maxLength || CUSTOM_QUESTION_OPTS.maxLength.default,
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

  buildOptions(isRemovable, data, index, editMode) {
    this.optionNumber = index;
    this.option = {
      val: data,
      required: true,
      removable: isRemovable,
    };
  }
}
function Questions({ data, mode, onSave, onCancel }) {
  // make first question visible by default;
  const [processing, setProcessing] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionaireDescription, setQuestionairreDescription] = useState("");

  useEffect(() => {
    if (data) {
      reset();
      let arr = [];
      data.questions.map((question, index) => {
        const q = new Question();
        q.buildQuestions(index > 0 ? true : false, question, true);
        arr.push(q);
      });
      arr?.questions?.map((question, index) => {
        if (question.options) {
          question.options = question.options
            .filter((opt) => opt)
            .map((a) => a.option);
        } else {
          question.options = null;
        }
      });
      setQuestionairreDescription(data.description);
      setQuestions(arr);
      setTimeout(() => {
        scrollDivToBottom("scrollable-question-div");
        window.scrollTo(0, document.body.scrollHeight);
      }, 150);
    } else {
      // new data
      let _question;
      let initialArray = [];
      _question = new Question(false);
      initialArray = [_question];
      setQuestions(initialArray);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
      reset();
    }
  };
  const setSelectedAnswerTypeCode = (index, value) => {
    var array = [...questions];
    if (index !== -1) {
      let i = 0;
      if (mode === "add") {
        while (i < 2) {
          // an option must be atleast two option by default
          array[index].question.options[i] = new Option(false);
          i++;
        }
      } else {
        // edit mode, where a new question is added and then changed on answer type.
        if (
          array[index].question.options === null ||
          array[index].question.options.length === 0
        ) {
          i = 0;
          if (array[index].question.options == null)
            array[index].question.options = [];
          while (i < 2) {
            // an option must be atleast two option by default
            array[index].question.options[i] = new Option(false);
            i++;
          }
        }
      }
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
    reset();
  };

  const handleRemoveOption = (index, optIndex) => {
    var array = [...questions];
    array[index].question.options.splice(optIndex, 1);
    setQuestions(array);
    reset();
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

  const formOptions = {
    resolver: yupResolver(questionValidationSchema),
    mode: "all",
  };
  const { register, handleSubmit, formState, watch, reset, clearErrors } =
    useForm(formOptions);
  const { errors } = formState;
  const onSubmit = (_data) => {
    setProcessing(true);
    _data.questions.map((question, index) => {
      question.number = index + 1;
      question.answerTypeCode = Number(question.answerType);
      question.hasOwnProperty("answerType");
      delete question["answerType"];
      question.maxRating = 0; // static field.
      if (question.answerTypeCode == 7) question.maxLength = 0; // for date time code maxlength would be zero
      if (question.options) {
        question.options = question.options
          .filter((opt) => opt)
          .map((a) => a.option);
        question.maxLength = 0; // for questions with options maxlength is set to 0
      } else {
        question.options = null;
      }
    });
    _data.questionnaireType = 1; // static field

    // now call API to create the questions.
    if (mode === "add") {
      QuestionairreService.createQuestionairre(_data)
        .then((res) => {
          setProcessing(false);
          if (res.data.success) {
            onSave(res.data.identifier);
            handleResponse(
              PARTICIPANT_QUESTIONAIRRES.CREATED,
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.BOTTOM_CENTER
            );
          } else {
            handleResponse(
              getWorkflowError(SESSION_ERROR.QUESTIONAIRRE.CREATE),
              RESPONSE_TYPES.ERROR,
              toast.POSITION.BOTTOM_CENTER
            );
          }
        })
        .catch((err) => {
          setProcessing(false);
          handleResponse(
            getWorkflowError(err.message),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        });
    } else {
      if (data.objId) {
        _data.objId = data.objId;
      }
      QuestionairreService.updateQuestionairre(_data)
        .then((res) => {
          setProcessing(false);
          if (res.data.success) {
            onSave(data.objId);
            handleResponse(
              PARTICIPANT_QUESTIONAIRRES.UPDATED,
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.BOTTOM_CENTER
            );
          } else {
            handleResponse(
              getWorkflowError(SESSION_ERROR.QUESTIONAIRRE.UPDATE),
              RESPONSE_TYPES.ERROR,
              toast.POSITION.BOTTOM_CENTER
            );
          }
        })
        .catch((err) => {
          setProcessing(false);
          handleResponse(
            getWorkflowError(err.message),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        });
    }
  };
  const handleOptionalChoiceChange =(index)=>{
    var array = [...questions];
    if (index !== -1) {
      array[index].question.optional= !array[index].question.optional;
    }
    setQuestions(array);
  }
  console.log(errors)

  return (
    <div className={`${processing ? "control__disabled__opaque" : ""} dark:bg-gray-dark bg-gray-100 dark:text-gray-400  text-gray-900`}>
      <Spacer />
      {/* INITIAL MANDATORY CONTROLS */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dark:bg-gray-dark bg-gray-100 flex gap-2">
          {/* QUESTION DESCRIPTION */}
          <FormControl
            variant="standard"
            sx={{ marginBottom: 1, marginTop: 1, width: "100%" }}
          >
            <TextField
              name="description"
              {...register(`description`, {
                onChange: (event) => {
                  setQuestionairreDescription(event.target.value);
                },
              })}
              helperText={errors.description?.message}
              error={errors.description?.message ? true : false}
              variant="filled"
              label="Questionairre Description"
              value={questionaireDescription}
            />
          </FormControl>
          {questions?.length > 0 && (
            <>
              <div className="flex ml-auto question-options gap-2 mt-4">
                <div onClick={handleAdd}>
                  <span
                    title="Add another question"
                    className=" cursor-pointer app-anchor-block"
                  >
                    {CUSTOM_QUESTION_OPTS.icons.AddQuestion}
                  </span>
                </div>
                {questions?.length > 1 && (
                  <div onClick={removeAll}>
                    <span
                      title="Remove all questions"
                      className="cursor-pointer app-anchor-block"
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
          className="scroll-smooth dark:bg-gray-dark bg-gray-100  overflow-auto py-1 px-2 mb-2 max-h-96  rounded-md shadow-md  "
        >
          <div className="dark:bg-gray-dark bg-gray-100 flex flex-col">
            {/* QUESTIONS ARRAY */}

            {questions?.map((question, index) => (
              <Box key={index} sx={{ width: "100%" }}>
                <Grid
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
                                className=" cursor-pointer app-anchor-block"
                              >
                                {CUSTOM_QUESTION_OPTS.icons.RemoveQuestion}
                              </span>
                            </div>
                          </>
                        )}
                        <div className="text-lg text-gray-600 mt-4">
                          Q#{index + 1}
                        </div>
                      </div>

                      <FormControl fullWidth variant="filled">
                        <TextField
                          helperText={
                            errors.questions?.[index]?.question?.message
                          }
                          error={
                            errors.questions?.[index]?.question?.message
                              ? true
                              : false
                          }
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

                      <FormControl
                className="flex"
                variant="filled"
                sx={{ marginBottom: 1, width: "100%" }}
              >
                <div className="flex">
                  <FormControlLabel
                    className="text-xs text-gray-600"
                    control={
                      <Switch
                        size="small"
                        checked={question.question.optional}
                        inputProps={{ "aria-label": "controlled" }}
                        name={`questions[${index}]optional`}
                        {...register(`questions.${index}.optional`, {
                          onChange: (event) => {
                            handleOptionalChoiceChange(index);
                          },
                        })}
                      />
                    }
                    label={<><Typography color="text.secondary" variant="body2">Optional</Typography></>}
                  />
                </div>
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
                              maxLength: 3,
                              minLength: 2,
                            })}
                            helperText={
                              errors.questions?.[index]?.maxLength?.message
                            }
                            error={
                              errors.questions?.[index]?.maxLength?.message
                                ? true
                                : false
                            }
                          />
                        </FormControl>
                      </>
                    )}
                  </Grid>

                  {isOptionalAnswer(question) &&
                    question?.question?.options?.length > 0 && (
                      <>
                        <Grid item xs={12}>
                          <div className=" flex gap-1 text-gray-600 mt-4 font-normal">
                            <div className="text-md">
                              <u>O</u>ptions
                            </div>

                            <div className="flex ml-auto question-option-options gap-2">
                              <div
                                onClick={() => handleAddOption(question, index)}
                              >
                                <span
                                  title="Add another option"
                                  className=" cursor-pointer app-anchor-block"
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
                    question?.question?.options.map((option, optIndex) => (
                      <Grid key={optIndex} item lg={4} xs={12}>
                        <div className="flex gap-3 -mt-3 ">
                          <div className="text-sm text-gray-600 mt-4">
                            Opt#{index + 1}.
                            {mode === "add"
                              ? optIndex - index + 1
                              : optIndex + 1}
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
                                  ? true
                                  : false
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
                                  className=" cursor-pointer app-anchor-block"
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

        <div className="save-questions-action-buttons">
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
            <IconButton
              onClick={() => onCancel("cancel")}
              aria-label="save-questions-cancel"
              size="small"
            >
              <CancelIcon color="warning" fontSize="small" />
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
