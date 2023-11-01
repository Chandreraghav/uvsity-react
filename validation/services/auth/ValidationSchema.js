import * as Yup from "yup";
import {
  PAST_EDUCATION_FORM_ERRORS,
  REGISTRATION_ERRORS,
  WORK_EXPERIENCE_FORM_ERRORS,
} from "../../../constants/error-messages";
import { PASSWORD } from "../../../constants/regex";
import { MIN_LENGTH_PASSWORD } from "../../../constants/constants";
import {
  isValidDate,
  isValidURL,
} from "../../../utils/utility";
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
          .typeError("you must specify a number")
          .positive("Category is required")
          .required("Category is required"),
        fullName: Yup.string().required("Title is required"),
        shortName: Yup.string().required("Short name is required"),
        previewurl: Yup.string()
          .notRequired()
          .test("preview_url", "Invalid URL", function (value) {
            if (value && value.trim() !== "") {
              return isValidURL(value);
            }
            return true;
          }),
      }),
      PARTICIPANT: Yup.object().shape({
        expectedNumber: Yup.number()
          .typeError("you must specify a number")
          .min(1, "Number of participant should be atleast 1")
          .max(100, "Number of participant cannot be more than 100")
          .positive("Number of participant should be atleast 1")
          .required("Number of participant should be atleast 1"),
      }),
      FEE: Yup.object().shape({
        freeSessionOrPaid: Yup.boolean(),
        sponsorshipReqd: Yup.boolean(),
        fees: Yup.number()
          .nullable()
          .typeError("you must specify a numeric amount")
          .min(1, "Amount must be atleast 1")
          .positive("Amount must be atleast 1")
          .when("freeSessionOrPaid", {
            is: true,
            then: Yup.number()
              .typeError("you must specify a numeric amount")
              .required("Amount is required"),
          }),

        sponsorshipFee: Yup.number()
          .nullable()
          .typeError("you must specify a numeric amount")
          .min(1, "Amount must be atleast 1")
          .positive("Amount must be atleast 1")
          .when("sponsorshipReqd", {
            is: true,
            then: Yup.number()
              .typeError("you must specify a numeric amount")
              .required("Amount is required"),
          }),
      }),
    },
  },

  SEND_REVIEW: Yup.object().shape({
    comments: Yup.string().required(
      'A comment is required to send a review'
    ),
  }),
  SEND_MESSAGE: Yup.object().shape({
    subject: Yup.string().required('Please select a subject'),
    message: Yup.string().required(
      'A message body text is required to send a message'
    ),
  })
};

export const USER = {
  PROFILE: {
    EDIT: {
      HIGHLIGHTS: Yup.object().shape({
        designation: Yup.string()
          .trim()
          .required(
            "Please enter a title or designation that describes you best from the choices available."
          ),
        organization: Yup.string()
          .trim()
          .required("Please enter the name of your company or organization."),
        country: Yup.string()
          .nullable()
          .required("Please select your country."),
        city: Yup.string().trim().required("Please enter your city name."),
        location: Yup.string().trim().required("Please enter your location name."),
        presentWorkPlace: Yup.boolean(),
        fromDate: Yup.date()
          .typeError(WORK_EXPERIENCE_FORM_ERRORS.PERIOD.FROM.REQUIRED)
          .max(
            Yup.ref("toDate"),
            WORK_EXPERIENCE_FORM_ERRORS.PERIOD.FROM.RANGE_ERROR
          )
          .required(WORK_EXPERIENCE_FORM_ERRORS.PERIOD.FROM.REQUIRED)
          .nullable()
          .test("fromDate", "Enter a valid period.", function (value) {
            return isValidDate(value, "MMMM,yyyy");
          }),
        toDate: Yup.date().when("presentWorkPlace", {
          is: true,
          then: Yup.date().typeError('')
            .nullable().notRequired()
        })
          .when("presentWorkPlace", {
            is: false,
            then: Yup.date()
              .typeError(WORK_EXPERIENCE_FORM_ERRORS.PERIOD.TO.REQUIRED)
              .min(
                Yup.ref("fromDate"),
                WORK_EXPERIENCE_FORM_ERRORS.PERIOD.TO.RANGE_ERROR
              )
              .required(WORK_EXPERIENCE_FORM_ERRORS.PERIOD.TO.REQUIRED)
              .nullable()

              .test("toDate", "Enter a valid period.", function (value) {
                return isValidDate(value, "MMMM,yyyy");
              })
          })
      }),

      SOCIAL: Yup.object().shape({
        uri: Yup.string().nullable().url("Enter a valid URL"),
      }),
      EDUCATION: Yup.object().shape({
        highestDegree: Yup.string()
          .trim()
          .required(
            "Please enter a highest degree of specialization, e.g MSc, PH.d, BS, MS etc"
          ),
      }),
      PASTEDUCATION: Yup.object().shape({
        educationInstitution: Yup.string()
          .trim()
          .required(PAST_EDUCATION_FORM_ERRORS.INSTITUTE.REQUIRED),
        degree: Yup.string()
          .trim()
          .required(PAST_EDUCATION_FORM_ERRORS.DEGREE.REQUIRED),
        campus: Yup.string()
          .trim()
          .required(PAST_EDUCATION_FORM_ERRORS.CAMPUS.REQUIRED),
        fromDate: Yup.date()
          .typeError(PAST_EDUCATION_FORM_ERRORS.PERIOD.FROM.REQUIRED)
          .max(
            Yup.ref("toDate"),
            PAST_EDUCATION_FORM_ERRORS.PERIOD.FROM.RANGE_ERROR
          )
          .required(PAST_EDUCATION_FORM_ERRORS.PERIOD.FROM.REQUIRED)
          .nullable()
          .test("fromDate", "Enter a valid period.", function (value) {
            return isValidDate(value, "MMMM,yyyy");
          }),
        toDate: Yup.date()
          .typeError(PAST_EDUCATION_FORM_ERRORS.PERIOD.TO.REQUIRED)
          .min(
            Yup.ref("fromDate"),
            PAST_EDUCATION_FORM_ERRORS.PERIOD.TO.RANGE_ERROR
          )
          .required(PAST_EDUCATION_FORM_ERRORS.PERIOD.TO.REQUIRED)

          .nullable()

          .test("toDate", "Enter a valid period.", function (value) {
            return isValidDate(value, "MMMM,yyyy");
          }),
      }),
    },
  },
};
