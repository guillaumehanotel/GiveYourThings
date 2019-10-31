import firebase from 'firebase';
import {connect} from 'react-redux';
import FirebaseConnection from './FirebaseConnection';

class MessageService {

  constructor(loggedUser) {
    this.init();
    this.state = {
      loggedUser: loggedUser,
    };
  }

  init = () => firebase;

  get ref() {
    return FirebaseConnection.database().ref('messages');
  }

  // get uid() {
  //   return (firebase.auth().currentUser || {}).uid;
  // }

  get timestamp() {
    return FirebaseConnection.database.ServerValue.TIMESTAMP;
  }

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  parse = snapshot => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  off() {
    this.ref.off();
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(MessageService);


