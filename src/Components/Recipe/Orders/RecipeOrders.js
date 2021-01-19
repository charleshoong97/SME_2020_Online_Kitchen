import React, { Component } from 'react';
import { Container, Button } from "reactstrap";
import Item from "../../Order/Items/Item/item";
import { statusColorCode, statusDisplayText } from "../../../Utils/CommonHelper";
import RecipeOrder from "../Order/RecipeOrder";
import './RecipeOrders.css'
import OrderDetails from "../OrderDetails/OrderDetails";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    let object = {
        orders: [],
        userid: '',
        email: '',
    }
    if (state.user != null) {
        object.userid = state.user._id
        object.email = state.user.email
    }
    if (state.orders != null && state.orders.length > 0) {
        if (object.email != '') {
            object.orders = state.orders.sort((a, b) => {
                if (object.email != 'admin') {
                    return (new Date(b.admin_updated_date) > new Date(a.admin_updated_date) ? 1 : -1)
                } else {
                    return (new Date(b.client_update_ddate) > new Date(a.client_update_ddate) ? 1 : -1)
                }
            })
        } else {
            object.orders = state.orders
        }
    }
    return object
}

class RecipeOrders extends Component {
    state = {
        open: false,
        //to be remove
        orderid: '1',
    }

    closeModal = () => {
        this.setState({ open: false })
    }

    openModal = () => {
        let id = Math.random().toString(16).slice(2)
        this.setState({ open: true, orderid: id })
    }

    render() {
        let emptyDetails = {
            orderid: this.state.orderid,
            userid: this.props.userid,
            title: '',
            status: '0',
            price: null,
            recipe: '',
            message: '',
        }

        return (
            <div className="Items">
                {this.props.email != 'admin' ?
                    <Button className='addRecipeButtonStyle align-self-end ItemsHead'
                        onClick={this.openModal}>Order Now</Button> : null
                }

                <Container>
                    {this.props.orders.map(element =>
                        <RecipeOrder order={element} />
                    )}
                </Container>
                {
                    this.state.open ?
                        <OrderDetails open={this.state.open} close={this.closeModal} order={emptyDetails} />
                        : null
                }

            </div>
        );
    }


}

export default connect(mapStateToProps)(RecipeOrders);
