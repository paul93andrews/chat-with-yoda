import React, {Component} from 'react';
import './globalStyles/App.scss';
import firebase, { auth, provider } from './firebase';
import LogInLogOutButton from './LogInButton/LogInButton';
import GuestButton from './GuestButton/GuestButton';
import ChatArea from './ChatArea/ChatArea';
import Footer from './Footer/Footer';

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
      <div className="body">
        <div className="heading wrapper">
          <h1>Chat with Yoda</h1>
        </div>
        <main className="userInteractionArea wrapper">
          <div className="imageContainer">
            <img src={require("./images/yodaImage.png")} alt="Photo of a wise and stoic Yoda" className="yoda rotate"/>
            <p className="description">Seeking wisdom? Mindfulness training? Advice for living on swampy planets? Then chat with this wise master from a galaxy far, far away</p>
          </div>
          <div className="accessButtons">
            <LogInLogOutButton 
            userSignedIn={this.state.user}
            buttonFunction={this.loginLogoutStateChanges}
            />
            <GuestButton
            guestAccess={this.updateGuestAccessInState}
            userID={this.state.userUID}
            />
          </div>
          <ChatArea
          userID={this.state.userUID}
          userMessages={this.state.storedMessages}
          userName={this.state.username}
          guestAccess={this.state.guestUser}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
{/* <footer>
  <p>Designed and Coded by Paul Andrews</p>
  {/* cool effect that on hover changes the text from the above to May the Force be with you */}
// </footer> */}
