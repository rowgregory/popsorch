export default async function getGoogleFirebaseCredentials() {
  return {
    email: process.env.FIREBASE_EMAIL,
    password: process.env.FIREBASE_PASSWORD,
    url: 'https://console.firebase.google.com/u/0/'
  }
}
