const renderQuestionEmailTemplate = (
  authorName: string,
  message: string,
  fullName: string,
  email: string,
  phone: string,
  offerName: string,
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Welcome Email</title>
    </head>

    <body>
      <div class="email">
        <h2>Hey ${authorName}!</h2>
        <p>We are glad that someone has sent a question for your offer named: <strong>${offerName}</strong></p>
        <p>Check all the details below:</p>
        
        <ul>
          <li>
            Related offer: <strong>${offerName}</strong>
          </li>
    
          <li>
            Full Name: <strong>${fullName}</strong>
          </li>

          <li>
            Email address: <strong>${email}</strong>
          </li>

          <li>
            Phone number: <strong>${phone}</strong>
          </li>

          <li>
            Question: <strong>${message}</strong>
          </li>
        </ul>

        <p>This email has been sent automatically, <strong>PLEASE DO NOT REPLY.</strong></p>
        <p>Instead of replying, please contact with the user by his email or phone number - thank you!</p>
      </div>
    </body>
    </html>
  `;
};

const renderResetPasswordEmailTemplate = (
  serverAddress: string,
  email: string,
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Foget password email</title>
    </head>

    <body>
      <div class="email">
        <h2>Hey ${email}!</h2>
        <p>Please click on a given link to reset your password:</p>
        <a 
          href="${serverAddress}"
          style="font-weight: bold;"
        >
          LINK
        </a>

        <p>Or click directly on this link:</p>
        <a 
          href="${serverAddress}"
          style="font-weight: bold;"
        >
          ${serverAddress}
        </a>
        
        <p><strong>Your password link is only valid for 7 days!</strong></p>
        <p>This email has been sent automatically, <strong>PLEASE DO NOT REPLY.</strong></p>
      </div>
    </body>
    </html>
  `;
};

export { renderQuestionEmailTemplate, renderResetPasswordEmailTemplate };
