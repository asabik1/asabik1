const enum AuthEmailConfig {
  FORGOT_PASSWORD_SUBJECT = 'Forget password',
  NEW_ACCOUNT_SUBJECT = 'Welcome to Asabik!',
  TEXT = 'Hey, you have got a new reset password link',
  NEW_ACCOUNT = 'Activate your Asabik account!',
}

const enum AuthHttpResponses {
  ACCOUNT_FROZEN = 'This account is frozen!',
  EMAIL_CONFLICT = 'This email is already in use!',
  AUTH_FAILED = 'Invalid email or password!',
  APPLE_AUTH_FAILED = 'Account with given apple id does not exist!',
  UPDATED_PASSOWRD = 'Your password has been changed!',
  NOT_UPDATED_PASSOWRD = 'Your password has not been changed, there was an error',
  WRONG_ACTIVATION_TOKEN = 'Your token is invalid!',
  ALREADY_ACTIVATED = 'User is already activated!',
}

export { AuthEmailConfig, AuthHttpResponses };
