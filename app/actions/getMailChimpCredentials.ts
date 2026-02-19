export default async function getMailChimpCredentials() {
  return {
    email: 'SarasotaPops',
    password: process.env.MAIL_CHIMP_PASSWORD,
    url: 'https://login.mailchimp.com/'
  }
}
