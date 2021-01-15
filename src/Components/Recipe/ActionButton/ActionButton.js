import React, {Component} from 'react';
import {Button} from "reactstrap";
import './ActionButton.css'
import {accepted, cancelled, delivering, received, rejected} from "../../../Utils/Constants";

class ActionButton extends Component {

    render() {
        let color;
        switch (this.props.label) {
            case 'cancel order':
                color = cancelled;
                break
            case 'add':
                color = 'white';
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
        }

        return (
            <Button className='actionButtonTextStyle' style={{backgroundColor: color, marginRight: this.props.label != 'add' ? 20 : 0}}
                    onClick={this.props.func}>{this.props.label}</Button>
        )
    }
}

export default ActionButton
