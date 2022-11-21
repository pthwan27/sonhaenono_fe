function isValidRegex(regex, value = "") {
  if (!regex) throw new Error("정규식을 넣어주세요.");
  return regex.test(value);
}

function isIdValidationCheck(value = "", regex = /^[0-9a-z_-]{5,20}/) {
  return isValidRegex(regex, value);
}

function isPasswordValidationCheck(
  value = "",
  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
) {
  return isValidRegex(regex, value);
}

function isEmailValidationCheck(
  value = "",
  regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
) {
  return isValidRegex(regex, value);
}

function isPhoneValidationCheck(value, regex = /[0-9]{10,}/) {
  return isValidRegex(regex, value);
}

function isNameValidationCheck(value, regex = /[가-힣a-z]/i) {
  console.log(isValidRegex(regex, value));
  return isValidRegex(regex, value);
}

export default {
  isValidRegex,
  isIdValidationCheck,
  isPasswordValidationCheck,
  isEmailValidationCheck,
  isPhoneValidationCheck,
  isNameValidationCheck,
};
