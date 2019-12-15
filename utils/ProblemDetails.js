const problemTypes = {
  invalid_credentials: {
    type: "/problems/invalid_credentials",
    title: "Invalid Credentials",
    status: 400
  },
  internal_error: {
    type: "/problems/internal_error",
    title: "Internal Error",
    status: 500
  },
  email_unavailable: {
    type: "/problems/email_unavailable",
    title: "Email Unavailable",
    status: 400
  },
  invalid_registration_data: {
    type: "/problems/invalid_registration_data",
    title: "Invalid Registration Data",
    status: 400
  }
};

const problemTypeEnum = {
  INVALID_CREDENTIALS: "invalid_credentials",
  INTERNAL_ERROR: "internal_error",
  EMAIL_UNAVAILABLE: "email_unavailable",
  INVALID_REGISTRATION_DATA: "invalid_registration_data"
};

//See RFC-7807 for reference
const ProblemDetails = function(problemType) {
  return problemTypes[problemType];
};

module.exports.ProblemDetails = ProblemDetails;
module.exports.problemTypeEnum = problemTypeEnum;
