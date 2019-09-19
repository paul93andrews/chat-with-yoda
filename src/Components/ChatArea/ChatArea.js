import React, {Component} from 'react';
import SendMessage from '../SendMessage/SendMessage';

class ChatArea extends Component {
    constructor(){
        super();
        this.state = {
            yodaDelayFinished: true,
        }
    }

    // below are functions that will update state in this component when submit button is pressed on SendMessage component
    delayYodaMessage = () => {
        this.setState({
            yodaDelayFinished: false
        })
    }

    showYodaMessage = () => {
        setTimeout(() => {
            this.setState({
                yodaDelayFinished: true
            })
        }, 2000)
    }

    render() {
        return(
            <section className="chatBox">
                {/* ternary operator below checks if there is a user signed in and will display different chatBox designs depending on which is true */}
                {this.props.userID == ''
                ? true
                : <section className="chatArea">
                    <div className="messageArea" id="chat">
                        {this.props.userMessages.map((convo, index) => {
                            return (
                                <ul id="chatHistory" key={index}>
                                    <li>
                                        <p>{
                                            this.props.userName == null
                                                ? 'Guest: '
                                                : convo.pastMessages.name + ': '}
                                            {convo.pastMessages.userMessage}
                                        </p>
                                        <p>
                                            {index !== this.props.userMessages.length - 1
                                                ? 'Yoda: ' + convo.pastMessages.yodaQuote
                                                : this.state.yodaDelayFinished ? 'Yoda: ' + convo.pastMessages.yodaQuote : "..."
                                            }
                                        </p>
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                    <SendMessage
                        userID={this.props.userID}
                        delayYoda={this.delayYodaMessage}
                        showYoda={this.showYodaMessage}
                        userName={this.props.userName}
                    />
                </section>
                }
            </section>
        )
    }
}

export default ChatArea;