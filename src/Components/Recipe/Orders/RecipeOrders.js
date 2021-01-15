import React, {Component} from 'react';
import {Container, Button} from "reactstrap";
import Item from "../../Order/Items/Item/item";
import {statusColorCode, statusDisplayText} from "../../../Utils/CommonHelper";
import RecipeOrder from "../Order/RecipeOrder";
import './RecipeOrders.css'
import OrderDetails from "../OrderDetails/OrderDetails";

class RecipeOrders extends Component {
    state = {
        open: false,
        //to be remove
        userid: '1',
        orderid: '1',
    }

    closeModal = () => {
        this.setState({open: false})
    }

    openModal = () => {
        let id = Math.random().toString(16).slice(2)
        this.setState({open: true, orderid: id})
    }

    render() {
        let emptyDetails = {
            orderid: this.state.orderid,
            userid: this.state.userid,
            title: '',
            status: '0',
            price: null,
            recipe: '',
            message: '',
        }

        return (
            <div className="Items">
                <Button className='addRecipeButtonStyle align-self-end ItemsHead'
                        onClick={this.openModal}>Order Now</Button>
                <Container>
                    {this.props.data.map(element =>
                        <RecipeOrder order={element}/>
                    )}
                </Container>
                <OrderDetails open={this.state.open} close={this.closeModal} order={emptyDetails}/>
            </div>
        );
    }


}

export default RecipeOrders;
