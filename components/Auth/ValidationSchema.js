import * as Yup from "yup";
import { REGISTRATION_ERRORS } from "../../constants/error-messages";
import { PASSWORD } from "../../constants/regex";
import { MIN_LENGTH_PASSWORD } from "../../constants/constants";
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
