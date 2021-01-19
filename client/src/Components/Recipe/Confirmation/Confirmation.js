import React, {Component} from 'react';
import {ModalBody, Modal, ModalHeader} from "reactstrap";
import ActionButton from "../ActionButton/ActionButton";
import './Confirmation.css'

class Confirmation extends Component {
    showQuestion = () => {
        switch (this.props.type) {
            case 'cancel':
                return 'Are you sure to cancel this order?'
            case 'reject':
                return 'Are you sure to reject this order?'
            case 'accept':
                return 'Please confirm your deliver address before proceed'
            default:
                return '';
        }
    }

    showMessage = () => {
        switch (this.props.type) {
            case 'accept':
                return this.props.address
            default:
                return ''
        }
    }

    showReminder = () => {
        switch (this.props.type) {
            case 'reject':
                return '*Please make sure you already inform customer the reason of reject this order'
            case 'accept':
                return '*If the address is incorrect, please change it at your profile before accept this order'
            default:
                return ''
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.open} centered={true} keyboard={false} backdrop="static">
                <ModalHeader toggle={this.props.close}/>
                <ModalBody>
                    <div className='confirmationContent d-flex flex-column justify-content-between'>
                        <span className='questionStyle'>{this.showQuestion()}</span>
                        <span>{this.showMessage()}</span>
                        <span>{this.showReminder()}</span>
                        <div className='d-flex flex-row justify-content-end'>
                            <ActionButton label='confirm' func={this.props.func}/>
                            <ActionButton label='close' func={this.props.close}/>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

export default Confirmation
