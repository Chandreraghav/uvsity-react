import { capitalizeFirstLetter } from "../utils/utility";
export class User {
  id;
  username;
  password;
  firstName;
  lastName;
  gender;
  emailId;
  recaptchaToken;
  userCredential = UserCredential;
  confirmPassword;
  userAddresses = [UserAddress];
  userSubType = UserSubType;
  userEducation = UserEducation;
  workExpStartDate;
  workExpEndDate;
  isPresent = false;
  userLoggedInIPAddress;
  timeZone;

  prepareRegistrationData(user, userCredentials, formData, ipData) {
    user.emailId = formData.email;
    user.firstName = capitalizeFirstLetter(formData.firstname);
    user.lastName = capitalizeFirstLetter(formData.lastname);
    user.recaptchaToken = formData.reCaptcha;
    user.timeZone = ipData?.time_zone.name;
    userCredentials.plainTextPassword = formData.password;
    user.userCredentials = {
      plainTextPassword: userCredentials.plainTextPassword,
    };
    user.userLoggedInIPAddress = ipData?.ip;
  }
  getStagedRegistrationData(user, credentials) {
    return {
      emailId: user.emailId,
      firstName: user.firstName,
      lastName: user.lastName,
      recaptchaToken: user.recaptchaToken,
      timeZone: user.timeZone,
      userCredential: { plainTextPassword: credentials.plainTextPassword },
      plainTextPassword: credentials.plainTextPassword,
      userLoggedInIPAddress: user.userLoggedInIPAddress,
    };
  }
}
export class UserCredential {
  plainTextPassword;
}
export class CountryTO {
  countryId;
}
export class UserAddress {
  countryTO = CountryTO;
  state;
  city;
  zipCode;
}
export class UserSubType {
  userSubTypeMaster;
}
export class UserEducation {
  userEducationSubject;
  userEducationDegreeCourse;
  userEducationEducationInstitution;
  userEducationCampus;
}

export class ResetPassword {
  newPassword;
  confirmNewPassword;
  resetPasswordLink;
  emailId;
}
