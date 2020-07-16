import firebase from 'firebase/app';
import 'firebase/storage';

//
const firebaseConfig = {
  apiKey: 'AIzaSyCKGEiJw8zwQ-o2uprorjtF7T6sEUCOFiY',
  authDomain: 'caro-react-redux.firebaseapp.com',
  databaseURL: 'https://caro-react-redux.firebaseio.com',
  projectId: 'caro-react-redux',
  storageBucket: 'caro-react-redux.appspot.com',
  messagingSenderId: '1031822195135',
  appId: '1:1031822195135:web:c5fd2a62cd01cdd3a0090a',
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
