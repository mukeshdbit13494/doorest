export const regxFirstName = /^(?=.{1,50}$)[a-zA-Z]+(?:['_.\s][a-z]+)*$/;
export const regxLastName = /^(?=.{1,50}$)[a-zA-Z]+(?:['_.\s][a-z]+)*$/;
export const regxMobileNumber = /^\d{10}$/;
export const regxAltMobileNumber = /^\d{10}$/;
export const regxFatherName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const regxAadharNumber = /^\d{12}$/;
export const regxPinCode = /^\d{6}$/;
export const regxEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//password validation for Minimum six characters, at least one letter and one number:
export const regxPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
