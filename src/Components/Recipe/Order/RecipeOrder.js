import {statusColorCode, statusDisplayText} from "../../../Utils/CommonHelper";
import React, {useState, Component} from 'react';
import './RecipeOrder.css';
import {Button, Form, Input, ModalBody, ModalHeader} from "reactstrap";
import Message from "../Message/Message";
import * as axios from "axios";
import ActionButton from "../ActionButton/ActionButton";
import OrderDetails from "../OrderDetails/OrderDetails";

class RecipeOrder extends Component {
    state ={
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

    openModal = () =>{
        this.setState({open: true})
    }

    closeModal = () => {
        this.setState({open: false})
    }

    render() {

        return (
            <div>
                {
                    this.state.open ?
                        <OrderDetails open={this.state.open} close={this.closeModal} order={this.props.order}/> :
                        null
                }

                <div className='orderAnimation' onClick={this.openModal}>
                    <div className='orderContainer'>
                        <div>
                            <span className='orderTitleTextStyle'>{this.props.order.title}</span>
                        </div>
                        <div>
                            {this.statusBox(this.props.order.status)}
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
