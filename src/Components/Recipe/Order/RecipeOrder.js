import {statusColorCode, statusDisplayText} from "../../../Utils/CommonHelper";
import React, {useState, Component} from 'react';
import {ModalBody, Modal, ModalHeader} from "reactstrap";
import './RecipeOrder.css';

class RecipeOrder extends Component {
    state = {
        open: false
    }

    statusBox = (status) => {
        return (
            <div className='statusStyle' style={{backgroundColor: statusColorCode(status)}}>
                <p className='statusTextStyle'>{statusDisplayText(status)}</p>
            </div>
        )
    }

    priceFilter = (price) => {
        if (price == null) {
            return '-';
        } else {
            return 'RM ' + price;
        }
    }

    openModal = () => {
        this.setState({open: true});
    }

    closeModal = () => {
        this.setState({open: false});
    }

    render() {

        let modal = (
            <Modal isOpen={this.state.open} toggle={this.closeModal} className='modalStyle' centered={true}>
                <ModalHeader toggle={this.closeModal}>Modal title</ModalHeader>
                <ModalBody>
                    <div>
                        <h2>Title</h2>
                        <h2>{this.props.order.title}</h2>
                    </div>
                </ModalBody>
            </Modal>
        )

        return (
            <div>
                {modal}
                <div className='orderAnimation' onClick={this.openModal}>
                    <div className='orderContainer'>
                        <div>
                            <span className='orderTitleTextStyle'>{this.props.order.title}</span>
                        </div>
                        <div>
                            {this.statusBox(parseInt(this.props.order.status))}
                            <div className='priceStyle'>
                                <p>Price : {this.priceFilter(this.props.order.price)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeOrder;
