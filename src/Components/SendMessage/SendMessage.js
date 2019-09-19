import React, {Component} from 'react';
import firebase from '../firebase';
import yodaQuotes from '../YodaQuotes/YodaQuotes';
import './_sendMessage.scss';

class SendMessage extends Component {
    constructor() {
        super();
        this.state = {
            randomYoda: yodaQuotes[Math.floor(Math.random() * yodaQuotes.length)],
            userMessage: ''
        }
    }

    updateMessage = event => {
        this.setState({
            userMessage: event.target.value
        })
    }

    submit = event => {
        event.preventDefault();

        //if else statement that will error handle for when no message is typed and then update state when message is inputted
        if (this.state.userMessage == '') {
            alert('you must have a message for the Jedi Master');
            //make this a sweet alert
        }
        else {
            this.props.delayYoda();

            this.setState({
                randomYoda: yodaQuotes[Math.floor(Math.random() * yodaQuotes.length)]
            });

            const dbRef = firebase.database().ref().child(this.props.userID);
            // pushes the randomly generated yoda quote and the user's input to be stored in firebase
            dbRef.push({
                name: this.props.userName,
                userMessage: this.state.userMessage,
                yodaQuote: this.state.randomYoda
            });
            // reset our input/message field back to empty
            this.setState({
                userMessage: "",
            });
        }

        this.props.showYoda();
    }

    render(){
        return(
            <div className="sendMessage">
                <form name="sendMessages" action="">
                    <label htmlFor="userInputMessage" className="visuallyHidden">Text Area to type Message</label>
                    <textarea
                        type="text"
                        name="userInputMessage"
                        id="message"
                        onChange={this.updateMessage}
                        value={this.state.userMessage}
                    />
                    <label htmlFor="submitMessage" className="visuallyHidden">Button to Submit Message</label>
                    <button name="submitMessage" className="accessButton" onClick={this.submit} id="generateChat">Show text and random yoda quote</button>
                </form>
            </div>
        )
    }
}

export default SendMessage;