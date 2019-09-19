import React, {Component} from 'react';
import './globalStyles/App.scss';
import firebase, { auth, provider } from './firebase';
import LogInLogOutButton from './LogInButton/LogInButton';
import GuestButton from './GuestButton/GuestButton';
import ChatArea from './ChatArea/ChatArea';

class App extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      user: null,
      userUID: '',
      storedMessages: [],
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user,
          username: user.displayName,
          userUID: user.uid
        });

        console.log(this.state.userUID);
        const dbRef = firebase.database().ref().child(this.state.userUID);

        dbRef.on("value", data => {
            const response = data.val();

            const newState = [];

            for (let key in response) {
                newState.push({
                    pastMessages: response[key]
                });
            }

            this.setState({
                storedMessages: newState
            })
        });
      }
    });
  }

  loginLogoutStateChanges = (user, userName, userID, userMessages) => {
    this.setState({
      user,
      username: userName,
      userUID: userID,
      storedMessages: userMessages
    });
  }

  updateGuestAccessInState = (user, userName, userID) => {
    this.setState({
      user,
      username: userName,
      userUID: userID
    });
  }

  render(){
    return (
      <body>
          <div className="accessButtons">
            <LogInLogOutButton 
            userSignedIn={this.state.user}
            buttonFunction={this.loginLogoutStateChanges}
            />
            <GuestButton
            guestAccess={this.updateGuestAccessInState}
            />
          </div>
        <ChatArea
        userID={this.state.userUID}
        userMessages={this.state.storedMessages}
        userName={this.state.username}
        guestAccess={this.state.guestUser}
        />
      </body>
    );
    
  }
}

export default App;
