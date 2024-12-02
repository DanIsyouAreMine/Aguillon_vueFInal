import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAf7hz2tWQVkymLsktc0v06dTbakQClsZA',
  authDomain: 'dog-adaptionfinal.firebaseapp.com',
  projectId: 'dog-adaptionfinal',
  storageBucket: 'dog-adaptionfinal.firebasestorage.app',
  messagingSenderId: '941867739491',
  appId: '1:941867739491:web:3f4d4c5b713434a5664b56',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
