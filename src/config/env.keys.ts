export const Env = {
  port: 'PORT',
  /**
   * Service metadata
   */
  service_name: 'SERVICE_NAME',
  service_secret: 'SERVICE_SECRET',

  /**
   * Database credentials
   */
  database_url: 'DATABASE_URL',
  database_type: 'DATABASE_TYPE',

  /**
   * In memory databade
   */
  redis_url: 'REDIS_URL',

  /**
   * Twilio credentials
   */
  twilio_account_sid: 'TWILIO_ACCOUNT_SID',
  twilio_verification_service_sid: 'TWILIO_VERIFICATION_SERVICE_SID',
  twilio_auth_token: 'TWILIO_AUTH_TOKEN',

  /**
   * Paystack credentials
   */
  paystack_sk: 'PAYSTACK_SECRET_KEY',
  paystack_pk: 'PAYSTACK_PUBLIC_KEY',
  paystack_account_email: 'PAYSTACK_ACCOUNT_EMAIL',
};
