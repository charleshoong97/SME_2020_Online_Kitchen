import React, {Component} from 'react';
import {Button} from "reactstrap";
import './ActionButton.css'
import {accepted, add, cancelled, delivering, received, rejected, send, confirm, close} from "../../../Utils/Constants";

class ActionButton extends Component {

    render() {
        let color;
        switch (this.props.label) {
            case 'send':
                color = send;
                break;
            case 'cancel order':
                color = cancelled;
                break
            case 'add':
                color = add;
                break
            case 'accept':
                color = accepted;
                break
            case 'received':
                color = received;
                break
            case 'reject':
                color = rejected;
                break
            case 'delivering':
                color = delivering;
                break
            case 'confirm' :
                color = confirm
                break
            case 'close':
                color = close
                break
        }

        return (
            <Button className='actionButtonTextStyle'
                    disabled={this.props.disabled}
                    style={{backgroundColor: color, marginRight: this.props.label != 'add' ? 20 : 0}}
                    onClick={this.props.func}>{this.props.label}</Button>
        )
    }
}

export default ActionButton
