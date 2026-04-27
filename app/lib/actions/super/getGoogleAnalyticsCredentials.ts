export default async function getGoogleAnalyticsCredentials() {
  return {
    analyticsId: 'G-XXXXXXXXXX',
    email: 'thepopsorchestra@gmail.com',
    password: process.env.GOOGLE_ANALYRICS_PASSWORD,
    gcpUrl: 'https://analytics.google.com'
  }
}
