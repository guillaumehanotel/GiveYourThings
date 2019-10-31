import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAaeaZphkJkGr5-PFfj7C0mR__YE2-AZlw',
  authDomain: 'ovh.dawndash.giveyourthings',
  databaseURL: 'https://giveyourthings.firebaseio.com/',
  projectId: 'giveyourthings',
  storageBucket: 'giveyourthings.appspot.com',
  messagingSenderId: '174543238911',
};


export default firebase.initializeApp(firebaseConfig);
