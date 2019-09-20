import React, {Component} from 'react';

class Footer extends Component {
    constructor() {
        super();
        this.state = { 
            footerTextOnHover: '' 
        }
    }
    //set the text to be revealed on hover of footer element
    onMouseover(e) {
        this.setState({ footerTextOnHover: 'some text' })
    }
    //clear the text to show the original text on footer element
    onMouseout(e) {
        this.setState({ footerTextOnHover: '' })
    }
    render() {
        return (
            <footer>
                <p
                    onMouseEnter={this.onMouseover.bind(this)}
                    onMouseLeave={this.onMouseout.bind(this)}
                >
                {this.state.footerTextOnHover == ''
                ?   'Designed and Coded by Paul Andrews'
                :   'May the Force be with You'}
                </p>
            </footer>
        )
    }
}

export default Footer;