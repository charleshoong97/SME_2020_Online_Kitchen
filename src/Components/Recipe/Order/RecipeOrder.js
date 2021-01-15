import {statusColorCode, statusDisplayText} from "../../../Utils/CommonHelper";
import React, {useState, Component} from 'react';
import './RecipeOrder.css';
import Modal from "reactstrap/es/Modal";
import {Button, Form, Input, ModalBody, ModalHeader} from "reactstrap";
import Message from "../Message/Message";
import * as axios from "axios";
import ActionButton from "../ActionButton/ActionButton";

class RecipeOrder extends Component {
    state = {
        open: false,
        email: 'admin',
        loading: false,
        title: this.props.order.title,
        recipe: this.props.order.recipe,
        message: null,
        price: this.props.order.price,
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

    conversation = () => {
        if (this.props.order.message != null && this.props.order.message.length > 0) {
            return (
                <div>
                    {
                        this.props.order.message.map((element) =>
                            <Message message={element}/>
                        )
                    }
                </div>
            )
        }
        return null;
    }

    cancel = () => {
        this.closeModal()
    }

    statusButton = () => {
        switch (parseInt(this.props.order.status)) {
            case 1:
                return (
                        <ActionButton label={'cancel order'} func={this.cancel}/>
                )
            case 2:
                return (
                    <div>
                        <ActionButton label={'cancel order'} func={this.cancel}/>
                        <ActionButton label={'accept'} func={this.cancel}/>
                    </div>
                )
        }
    }



    sendUpdate = async () => {
        this.setState({
            loading: true
        })
        let status = this.props.order.status
        if (this.props.order.status == '1') {
            status = '2'
        } else if (this.props.order.status == '2') {
            status = '1'
        }
        await axios.get("#", {
            orderid: this.props.order.orderid,
            Title: this.state.title,
            Recipe: this.state.recipe,
            Price: this.state.price,
            Status: status,
            Message: this.state.message,

        }).then((data) => {
            console.log(data)
            if (this.state.message != null && this.state.message != '') {
                let character = 'C'
                if (this.state.email == 'admin') {
                    character = 'R'
                }
                this.props.order.message.push(
                    [
                        character,
                        this.state.message
                    ]
                )
                this.setState({
                    message: ''
                })
            }
            this.props.order.status = status
            this.props.order.title = this.state.title
            this.props.order.price = this.state.price
            this.props.order.recipe = this.state.recipe
        }).catch(err => console.log("Some Error")).then(console.log("Lets trye this "));
        this.setState({
            loading: false
        })
    }

    openModal = () => {
        this.setState({open: true});
    }

    closeModal = () => {
        this.setState({open: false});
    }

    render() {
        let disabledTitle = this.state.email == 'admin' || (this.state.email != 'admin' && (this.props.order.status != '2' && this.props.order.status != '0'))
        let disabledPrice = this.state.email != 'admin' || (this.state.email == 'admin' && (this.props.order.status != '1'))
        let disabledRecipe = this.state.email == 'admin' || (this.state.email != 'admin' && (this.props.order.status != '2' && this.props.order.status != '0'))
        let showMessage = this.props.order.status != '4' && this.props.order.status != '6' && this.props.order.status != '7'


        let modal = (
            <Modal isOpen={this.state.open} toggle={this.closeModal} centered={true} backdrop="static" keyboard={false}>
                <ModalHeader toggle={this.closeModal}>
                </ModalHeader>
                <ModalBody>
                    <div className='d-flex flex-row justify-content-between align-items-start'>
                        <div>
                            <div className='d-flex flex-row'>
                                <span className='titleLabelStyle'>Title :</span> <br/>
                                <input className='titleInputStyle' value={this.state.title}
                                       type={'text'}
                                       name={'title'}
                                       onChange={(event) => {
                                           this.setState({
                                               title: event.target.value
                                           })
                                       }}
                                       disabled={disabledTitle}
                                />
                            </div>
                            <div className='d-flex flex-row'>
                                <span className='titleLabelStyle'>Price :</span>
                                <span className='prefix'>RM</span>
                                <input className='priceInputStyle' value={this.state.price}
                                       type={'text'}
                                       name={'price'}
                                       disabled={disabledPrice}
                                       onChange={(event) => {
                                           this.setState({
                                               price: event.target.value
                                           })
                                       }}
                                />
                            </div>
                        </div>
                        <div className='d-flex flex-row align-items-center'>
                            <div className='statusCircle'
                                 style={{backgroundColor: statusColorCode(this.props.order.status)}}></div>
                            <h2>{statusDisplayText(this.props.order.status)}</h2>
                        </div>
                    </div>
                    <div>
                            <textarea className='recipeInputStyle' name={'recipe'} value={this.state.recipe}
                                      type={'text'}
                                      disabled={disabledRecipe}
                                      placeholder='Recipe URL or recipe details'
                                      onChange={(event) => {
                                          this.setState({
                                              recipe: event.target.value
                                          })
                                      }}
                            />
                    </div>
                    {
                        this.conversation()
                    }
                    {
                        showMessage ?
                            <div>
                                <span className='messageLabelStyle'>Message to restaurant ...</span>
                                <textarea className='messageInputStyle' name={'message'} value={this.state.message}
                                          type={'text'}
                                          placeholder="I can't eat spicy..."
                                          onChange={(event) => {
                                              this.setState({
                                                  message: event.target.value
                                              })
                                          }}
                                />
                            </div>
                            : null
                    }
                    <div className='d-flex flex-row justify-content-between'>
                        <div>
                            {
                                this.statusButton()
                            }
                        </div>
                        <div>
                            {
                                showMessage ?
                                    <Button type={'submit'} onClick={this.sendUpdate}
                                            disabled={this.state.loading}>Send</Button>
                                    : null
                            }

                        </div>
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
