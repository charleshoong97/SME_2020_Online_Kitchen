import React, { Component } from 'react';
import '../OrderOnline/OrderOnline.css';

import axios from 'axios';
import Toolbar from '../../Components/navigation/toolbar/toolbar';
import { NavLink } from 'react-router-dom';
import Items from '../../Components/Order/Items/Items';
import Form from '../../Components/Order/orderForm/orderForm';
import Footer from '../../Components/navigation/footer/footer';
import RecipeOrders from "../../Components/Recipe/Orders/RecipeOrders";
class Recipe extends Component {

    state = {
        tempList: [
            {
                orderid: '1',
                userid: '1',
                title: 'nasi Lemak',
                status: '1',
                price: null,
                recipe: 'https://reactstrap.github.io/components/modals/',
                message: [
                    [
                        'C',
                        'Hello'
                    ],
                    [
                        'R',
                        'May I help you'
                    ]
                ]
            },
            {
                title: 'nasi Lemak',
                status: '1',
                price: null,
                message : null,
            }
        ]
    }

    placeOrder = (obj) => {
        var copy = {
            ...obj, food: this.props.data, time: new Date().toString(), user: {
                geo:{lat:0,long:0},
                more:window.navigator.userAgent
            }
        };
        navigator.geolocation.getCurrentPosition(data=>{
            copy.user.geo.lat=data.coords.latitude;
            copy.user.geo.long=data.coords.longitude
        });
        if (this.props.data.length > 0) {
            axios.post("https://twobrother0927.firebaseio.com/.json", copy).then(()=>alert("Your Order is Placed!"));
        }
        else {
            alert("Please select some items from Menu first");
        }
    }


    render() {
        return (
            <div className="OrderOnline">
                <section className="Order">
                    <Toolbar count={this.props.count} />
                    <p className="OrderHead">Recipe Order</p>
                </section>
                <section className="Orderitems">
                    <RecipeOrders data={this.state.tempList}/>
                </section>
                <Footer />
            </div>
        );
    }
}
export default Recipe;
