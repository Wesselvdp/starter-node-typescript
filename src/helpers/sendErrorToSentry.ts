const Sentry = require('@sentry/node');

// Sentry error handling. This function sends data to our Sentry dashboard.
export const sendErrorToSentry = (err: Error): void => {
  // We dont want to send errors to Sentry during development
  if (process.env.NODE_ENV === 'development') return;

  // Add tags and context to be displayed in the Sentry dashboard
  // I've added some extra hardcoded data in there.
  Sentry.setContext('psychologist', {
    name: 'John Doe',
    office: 'Amsterdam',
  });
  const tags = { userType: 'psychologist' };

  Sentry.captureException(err, { tags });
};
