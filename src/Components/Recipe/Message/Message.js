import React, {Component} from "react";
import './Message.css'

class Message extends Component {

    state = {
        // to be remove
        email: this.props.email,
        character: '',
        position: '',
        messageStyle: '',
    }


    initiateState = () => {
        if ((this.props.email == 'admin' && this.props.message[0] == 'R') ||
            (this.props.email != 'admin' && this.props.message[0] == 'C')) {
            this.setState({
                character: 'Me',
                position: 'd-flex flex-row-reverse align-items-center',
                messageStyle: 'text-right messageStyle',
            })
        }
        else if (this.props.message[0] == 'R') {
            this.setState({
                character: 'Restaurant',
                position: 'd-flex flex-row align-items-center',
                messageStyle: 'text-left messageStyle',
            })
        }
        else if (this.props.message[0] == 'C') {
            this.setState({
                character: 'Customer',
                position: 'd-flex flex-row align-items-center',
                messageStyle: 'text-left messageStyle',
            })
        }
    }

    componentDidMount() {

        this.initiateState();
    }

    render() {
        return (
            <div className={this.state.position}>
                <span className='characterStyle'>{this.state.character}</span>
                <span style={{paddingLeft: 10, paddingRight: 10}}> : </span>
                <span className={this.state.messageStyle}>{this.props.message[1]}</span>
            </div>
        )
    }


}

export default Message
