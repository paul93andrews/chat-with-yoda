import React, {Component} from 'react';
import SendMessage from '../SendMessage/SendMessage';

class ChatArea extends Component {
    constructor(){
        super();
        this.state = {
            yodaDelayFinished: true,
        }
    }

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

    render(props) {
        return(
            <section className="chatBox">
                <div className="chatArea" id="chat">
                    {this.props.userMessages.map((convo, index) => {
                        return (
                            <ul id="chatHistory">
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
        )
    }
}

export default ChatArea;