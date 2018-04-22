import Rebase from 're-base'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAiZVxAt4RI-T57eBpEIW7pkyCO8v-lX1E',
  authDomain: 'coinprofit-6cc86.firebaseapp.com',
  databaseURL: 'https://coinprofit-6cc86.firebaseio.com',
  projectId: 'coinprofit-6cc86',
  storageBucket: 'coinprofit-6cc86.appspot.com',
  messagingSenderId: '518163256586',
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
const facebookProvider = new firebase.auth.FacebookAuthProvider()

export { app, base, facebookProvider }
