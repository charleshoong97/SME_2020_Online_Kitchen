import React, {Component} from "react";
import './Message.css'

class Message extends Component {

    state = {
        // to be remove
        email: 'admin',
        character: '',
        position: '',
        // characterClassName: '',
    }


    initiateState = () => {
        if ((this.state.email == 'admin' && this.props.message[0] == 'R') ||
            (this.state.email != 'admin' && this.props.message[0] == 'C')) {
            this.setState({
                character: 'Me',
                position: 'd-flex flex-row-reverse',
                // characterClassName: 'rightCharacter',
            })
        }
        else if (this.props.message[0] == 'R') {
            this.setState({
                character: 'Restaurant',
                position: 'd-flex flex-row',
                // characterClassName: 'leftCharacter',
            })
        }
        else if (this.props.message[0] == 'C') {
            this.setState({
                character: 'Customer',
                position: 'd-flex flex-row',
                // characterClassName: 'leftCharacter',
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
                <span>{this.props.message[1]}</span>
            </div>
        )
    }


}

export default Message
