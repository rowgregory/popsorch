export default async function getHostGatorCredentials() {
  return {
    email: 'TICKETS@THEPOPSORCHESTRA.ORG',
    password: process.env.HOST_GATOR_PASSWORD,
    url: 'https://www.hostgator.com/my-account/login'
  }
}
