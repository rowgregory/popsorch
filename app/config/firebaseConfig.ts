import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'IzaSyC4v12cOABmO_HRBhhB71n-ki1RRVvy8Tw',
  authDomain: 'the-pops-orchestra.firebaseapp.com',
  projectId: 'the-pops-orchestra',
  storageBucket: 'the-pops-orchestra.firebasestorage.app',
  messagingSenderId: '63527197965',
  appId: '1:63527197965:web:c2d6cd92510941d3b1e444',
  measurementId: 'G-77F04BXCH1'
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

export { storage, getToken, onMessage }
