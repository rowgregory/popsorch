export async function getGoogleAnalyticsCredentials() {
  return {
    analyticsId: 'G-XXXXXXXXXX',
    email: 'thepopsorchestra@gmail.com',
    password: process.env.GOOGLE_ANALYTICS_PASSWORD,
    gcpUrl: 'https://analytics.google.com'
  }
}

export async function getGoogleFirebaseCredentials() {
  return {
    email: process.env.FIREBASE_EMAIL,
    password: process.env.FIREBASE_PASSWORD,
    url: 'https://console.firebase.google.com/u/0/'
  }
}

export async function getHostGatorCredentials() {
  return {
    email: 'TICKETS@THEPOPSORCHESTRA.ORG',
    password: process.env.HOST_GATOR_PASSWORD,
    url: 'https://www.hostgator.com/my-account/login'
  }
}

export async function getMailChimpCredentials() {
  return {
    email: 'SarasotaPops',
    password: process.env.MAIL_CHIMP_PASSWORD,
    url: 'https://login.mailchimp.com/'
  }
}

export async function getResendCredentials() {
  return {
    email: process.env.RESEND_EMAIL,
    password: process.env.RESEND_PASSWORD,
    url: 'https://resend.com/'
  }
}
