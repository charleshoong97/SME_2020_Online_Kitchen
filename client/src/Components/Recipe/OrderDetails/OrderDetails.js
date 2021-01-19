import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import {statusColorCode, statusDisplayText} from "../../../Utils/CommonHelper";
import Message from "../Message/Message";
import ActionButton from "../ActionButton/ActionButton";
import * as axios from "axios";
import './OrderDetails.css'
import {connect} from "react-redux";
import {addOrder, updateOrder} from "../../../Redux/Action/RecipeOrder";
import {backend} from "../../../Utils/Constants";
import Confirmation from "../Confirmation/Confirmation";

const mapStateToProps = (state) => {
    let object = {
        email: '',
        userid: '',
        address: '',
    }
    if (state.user != null) {
        object.userid = state.user._id
        object.email = state.email
        object.address = state.address
    }
    return object
}

const mapDispatchToProps = {
    addOrder,
    updateOrder,
};

class OrderDetails extends Component {
    state = {
        loading: false,
        title: this.props.order.title,
        recipe: this.props.order.recipe,
        message: null,
        price: this.props.order.price,
        showConfirmation: false,
        confirmType: null,
        func: null,
    }

    conversation = () => {
        if (this.props.order.message != null && this.props.order.message.length > 0) {
            return (
                <div>
                    {
                        this.props.order.message.map((element) =>
                            <Message message={element} email={this.props.email}/>
                        )
                    }
                </div>
            )
        }
        return null;
    }

    updateStatusAxios = async (status) => {
        this.setState({
            loading: true
        })
        await axios.put(backend + "/order/update-recipe-order", {
            order_id: this.props.order._id,
            user_id: this.props.order.user_id,
            status: status,
            client_update_ddate: new Date(),
        }).then((response) => {
            console.log('response', response)
            this.props.updateOrder(response.data)
            this.setState({
                openConfirmation: false
            })
            this.props.close()
        }).catch(err => console.log(err))
        this.setState({
            loading: false
        })
    }

    cancel = () => {
        this.openConfirmation()
        this.setState({
            confirmType: 'cancel',
            func: async () => {
                await this.updateStatusAxios('4')
            }
        })
    }

    accept = () => {
        this.openConfirmation()
        this.setState({
            confirmType: 'accept',
            func: async () => {
                await this.updateStatusAxios('3')
            }
        })
    }

    received = async () => {
        await this.updateStatusAxios('6')
    }

    reject = () => {
        this.openConfirmation()
        this.setState({
            confirmType: 'reject',
            func: async () => {
                await this.updateStatusAxios('7')
            }
        })
    }

    delivering = async () => {
        await this.updateStatusAxios('5')
    }

    statusButton = () => {
        if (this.props.email != 'admin') {
            switch (parseInt(this.props.order.status)) {
                case 1:
                    return (
                        <ActionButton label={'cancel order'} func={this.cancel} disabled={this.state.loading}/>
                    )
                case 2:
                    return (
                        <div className='d-flex flex-row'>
                            <ActionButton label={'cancel order'} func={this.cancel} disabled={this.state.loading}/>
                            <ActionButton label={'accept'} func={this.accept} disabled={this.state.loading}/>
                        </div>
                    )
                case 5:
                    return (
                        <ActionButton label={'received'} func={this.received} disabled={this.state.loading}/>
                    )
                case 3:
                case 4:
                case 6:
                case 7:
                    return null;
            }
        } else {
            switch (parseInt(this.props.order.status)) {
                case 1:
                case 2:
                    return (
                        <ActionButton label={'reject'} func={this.reject} disabled={this.state.loading}/>
                    )
                case 3:
                    return (
                        <ActionButton label={'delivering'} func={this.delivering} disabled={this.state.loading}/>
                    )
                case 4:
                case 5:
                case 6:
                case 7:
                    return null;
            }
        }

    }

    sendUpdate = async () => {
        this.setState({
            loading: true
        })
        let status = this.props.order.status
        let message = null
        if (this.props.email == 'admin') {
            status = '2'
            if (this.state.message != null && this.state.message != '') {
                message =
                    [
                        'C',
                        this.state.message
                    ]
            }
        } else if (this.props.email != 'admin') {
            status = '1'
            if (this.state.message != null && this.state.message != '') {
                message =
                    [
                        'C',
                        this.state.message
                    ]
            }
        }
        await axios.put(backend + "/order/update-recipe-order", {
            order_id: this.props.order._id,
            user_id: this.props.order.user_id,
            title: this.state.title,
            recipe: this.state.recipe,
            price: this.state.price,
            status: status,
            message: message,
            client_update_ddate: new Date(),
        }).then((response) => {
            console.log('response', response)
            this.props.updateOrder(response.data)
            this.setState({
                message: ''
            })
        }).catch(err => console.log(err))

        this.setState({
            loading: false
        })
    }

    add = async () => {
        await axios.post(backend + '/order/add-recipe-order', {
            user_id: this.props.userid,
            title: this.state.title,
            recipe: this.state.recipe,
            status: '1',
            message: this.state.message ? [['C', this.state.message]] : [],
            client_update_ddate: new Date(),
            admin_updated_date: new Date()
        }).then((response) => {
            console.log(response)
            this.props.addOrder(response.data)
            this.props.close()
        }).catch((e) => {
            console.log(e.response.data)
        })
    }

    openConfirmation = () => {
        this.setState({
            showConfirmation: true
        })
    }

    closeConfirmation = () => {
        this.setState({
            showConfirmation: false
        })
    }

    render() {
        let disabledTitle = this.props.email == 'admin' || (this.props.email != 'admin' && (this.props.order.status != '2' && this.props.order.status != '0'))
        let disabledPrice = this.props.email != 'admin' || (this.props.email == 'admin' && (this.props.order.status != '1'))
        let disabledRecipe = this.props.email == 'admin' || (this.props.email != 'admin' && (this.props.order.status != '2' && this.props.order.status != '0'))
        let showMessage = this.props.order.status != '4' && this.props.order.status != '6' && this.props.order.status != '7'

        return (
            <Modal isOpen={this.props.open} centered={true} backdrop="static"
                   keyboard={false}>
                <ModalHeader toggle={this.props.close}>
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
                                showMessage && this.props.order.status != '0' ?
                                    <ActionButton label='send' func={this.sendUpdate} disabled={this.state.loading}/>
                                    : [
                                        this.props.order.status == '0' ?
                                            <ActionButton label={'add'} func={this.add} disabled={this.state.loading}/>
                                            : null
                                    ]
                            }

                        </div>
                    </div>
                    {
                        this.state.showConfirmation ?
                            <Confirmation open={this.state.showConfirmation} close={this.closeConfirmation}
                                          func={this.state.func} type={this.state.confirmType}
                                          address={this.props.address}/>
                            : null
                    }
                </ModalBody>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
