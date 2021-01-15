import React, {Component} from 'react';
import {Button} from "reactstrap";
import './ActionButton.css'

class ActionButton extends Component {

    render() {
        let color;
        switch (this.props.label) {
            case 'cancel order':
                color = 'white';
                break
            case 'add':
                color = 'white';
                break
            case 'accept':
                color = 'white';
                break
            case 'Cancel':
                color = 'white';
                break
            case 'Cancel':
                color = 'white';
                break
            case 'Cancel':
                color = 'white';
                break
            case 'Cancel':
                color = 'white';
                break
            case 'Cancel':
                color = 'white';
                break
            case 'Cancel':
                color = 'white';
                break
        }

        return (
            <Button className='actionButtonTextStyle' color={color}
                    onClick={this.props.func}>{this.props.label}</Button>
        )
    }
}

export default ActionButton
