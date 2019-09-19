import React, {Component} from 'react';
import firebase from '../firebase';
import yodaQuotes from '../YodaQuotes/YodaQuotes';


class SendMessage extends Component {
    constructor() {
        super();
        this.state = {
            randomYoda: yodaQuotes[Math.floor(Math.random() * yodaQuotes.length)],
            userMessage: ''
        }
    }

    //anytime user sends a message it will get pushed up to the database to go through the cycle
    
    componentDidMount() {
        
    }

    componentWillUpdate() {
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
            // reset our input field back to empty
            this.setState({
                userMessage: "",
            });
        }

        this.props.showYoda();
    }


    render(){
        return(
            <section className="sendMessage">
                <textarea
                    type="text"
                    id="message"
                    onChange={this.updateMessage}
                    value={this.state.userMessage}
                />
                <button onClick={this.submit} id="generateChat">Show text and random yoda quote</button>
                {/* <button onClick={this.props.removeChat} className="removeChat">Remove Chat History</button> */}
            </section>

            //add labels to the buttons here
        )
    }
}

export default SendMessage;