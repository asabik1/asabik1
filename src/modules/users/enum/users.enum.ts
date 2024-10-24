const enum USERS_HTTP_RESPONSES {
  CREATED = 'User created',
  NOT_FOUND = 'User not found',
  EMAIL_CONFLICT = 'This email address is already being used',
  APPLE_ID_CONFLICT = 'User with given appleId already exists',
  BAD_FILE = 'Invalid file provided (We support PNG/JPG/JPEG)',
}

const enum TYPE_OF_USER {
  INVESTOR = 'Investor',
}

export { USERS_HTTP_RESPONSES };
