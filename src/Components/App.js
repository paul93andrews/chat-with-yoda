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
    // function below checks firebase to see if a user was previously signed in prior to refresh or changing tabs
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user,
          username: user.displayName,
          userUID: user.uid
        });

        const dbRef = firebase.database().ref().child(this.state.userUID);
        // following function pulls history of messages on firebase according to the previously signed in user and populates an array in state that will display the messages in the chat area
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

  // below are functions that will bring data from firebase calls made in button components into main app to be passed down throughout app's components
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
        <div className="heading">
          <h1>Chat with Yoda</h1>
        </div>
        <main className="userInteractionArea">
          <div className="imageContainer">
            <img src="" alt=""/>
          </div>
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
        </main>
        <footer>
          <p>Designed and Coded by Paul Andrews</p>
        </footer>
      </body>
    );
  }
}

export default App;
