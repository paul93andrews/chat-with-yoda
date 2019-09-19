import React, {Component} from 'react';
import firebase, { auth, provider } from '../firebase';
import '../ButtonStyles/_buttonStyles.scss';

class LogInButton extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this); 
        this.logout = this.logout.bind(this); 
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                const userMessages = [];
                this.props.buttonFunction(user, user.displayName, user.uid, userMessages);

                const dbRef = firebase.database().ref(`users/${user.uid}`);
            });
    }

    logout() {
        auth.signOut()
            .then(() => {
                const userSignedOut = null
                const userDisplaySignedOut = ''
                const userIDSignedOut = ''
                const userMessagesReset = []
                this.props.buttonFunction(userSignedOut, userDisplaySignedOut, userIDSignedOut, userMessagesReset);
            });
        }


    render() {
        return(
            <div className="buttons">
                {this.props.userSignedIn ?
                    <button onClick={this.logout} className="logout accessButton">Log Out</button>
                    :
                    <button onClick={this.login} className="login accessButton">Log In</button>
                }
            </div>
        )
    }
}

export default LogInButton;