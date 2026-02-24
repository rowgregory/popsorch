export default async function getResendCredentials() {
  return {
    email: process.env.RESEND_EMAIL,
    password: process.env.RESEND_PASSWORD,
    url: 'https://resend.com/'
  }
}
