import * as Yup from "yup";
import { REGISTRATION_ERRORS } from "../../../constants/error-messages";
import { PASSWORD } from "../../../constants/regex";
import { MIN_LENGTH_PASSWORD } from "../../../constants/constants";
export const registrationValidationSchema = Yup.object().shape({
  firstname: Yup.string().required(
    REGISTRATION_ERRORS.REQUIRED_FIELDS.FIRSTNAME
  ),
  lastname: Yup.string().required(REGISTRATION_ERRORS.REQUIRED_FIELDS.LASTNAME),
  email: Yup.string()
    .required(REGISTRATION_ERRORS.REQUIRED_FIELDS.EMAIL)
    .email(REGISTRATION_ERRORS.EMAIL_ERROR),
  password: Yup.string()
    .min(
      MIN_LENGTH_PASSWORD,
      REGISTRATION_ERRORS.PASSWORD_ERROR.MINIMUM_LENGTH_ERROR
    )
    .matches(PASSWORD, REGISTRATION_ERRORS.PASSWORD_ERROR.POLICY)
    .required(REGISTRATION_ERRORS.REQUIRED_FIELDS.PASSWORD),
  cpassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      REGISTRATION_ERRORS.PASSWORD_ERROR.MISMATCH
    )
    .required(REGISTRATION_ERRORS.REQUIRED_FIELDS.CONFIRM_PASSWORD),
  agreement: Yup.bool().oneOf(
    [true],
    REGISTRATION_ERRORS.TERMS_ACCEPTATION_ERROR
  ),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(REGISTRATION_ERRORS.REQUIRED_FIELDS.EMAIL)
    .email(REGISTRATION_ERRORS.EMAIL_ERROR),
  password: Yup.string()
    .min(
      MIN_LENGTH_PASSWORD,
      REGISTRATION_ERRORS.PASSWORD_ERROR.MINIMUM_LENGTH_ERROR
    )
    .matches(PASSWORD, REGISTRATION_ERRORS.PASSWORD_ERROR.POLICY)
    .required(REGISTRATION_ERRORS.REQUIRED_FIELDS.PASSWORD),
});

export const questionValidationSchema = Yup.object().shape({
  description: Yup.string().required("Questionairre description is required"),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      answerType: Yup.number().required("Answer Type is required"),
      maxLength: Yup.number().when("answerType", {
        is: 1,
        then: Yup.number()
          .required("Answer maximum length is required")
          .positive("Entry should be greater than 0")
          .integer("Input integer value")
          .max(999, "An answer cannot be more than 999 words")
          .min(50, "An answer cannot be less than 50 words"),
      }),
      options: Yup.array().when("answerType", {
        is: (answerType) =>
          // apply validation on fields which are either Checkbox, Drop down, multiselect or Radio

          answerType == 2 ||
          answerType == 3 ||
          answerType == 4 ||
          answerType == 5,
        then: Yup.array().of(
          Yup.object().shape({
            option: Yup.string().required("Option is required"),
          })
        ),
      }),
    })
  ),
});

export const SESSION = {
  CREATE: {
    STEPS: {
      BASIC: Yup.object().shape({
        category: Yup.number()
        .typeError('you must specify a number')
        .positive("Category is required").required('Category is required'),
        fullName: Yup.string().required("Name is required"),
        shortName: Yup.string().required("Short name is required"),
        previewurl: Yup.string().notRequired().matches(
          /((https?):\/\/)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Valid URL is required"
        ),
      }),
    },
  },
};
