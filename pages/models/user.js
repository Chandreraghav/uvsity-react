export class User {
    id ;
    username;
    password;
    firstName;
    lastName;
    gender;
    emailId;
    recaptchaToken;
    userCredential= UserCredential;
    confirmPassword;
    userAddresses=[UserAddress];
    userSubType=UserSubType;
    userEducation= UserEducation;
    workExpStartDate;
    workExpEndDate;
    isPresent=false;
    userLoggedInIPAddress;
    timeZone;
}
export class UserCredential {
    plainTextPassword;
}
export class CountryTO {
    countryId
}
export class UserAddress {
    countryTO=CountryTO;
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