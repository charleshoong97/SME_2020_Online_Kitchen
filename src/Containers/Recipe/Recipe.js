import React, {Component} from 'react';
import '../OrderOnline/OrderOnline.css';

import axios from 'axios';
import Toolbar from '../../Components/navigation/toolbar/toolbar';
import {NavLink} from 'react-router-dom';
import Items from '../../Components/Order/Items/Items';
import Form from '../../Components/Order/orderForm/orderForm';
import Footer from '../../Components/navigation/footer/footer';
import RecipeOrders from "../../Components/Recipe/Orders/RecipeOrders";
import {backend} from "../../Utils/Constants";
import {login} from "../../Redux/Action/User";
import {connect} from "react-redux";
import {loadOrder} from "../../Redux/Action/RecipeOrder";

const mapDispatchToProps = {
    login,
    loadOrder
};

const mapStateToProps = (state) => {
    let object = {
        userid : '',
    }
    if (state.user != null) {
        object.userid = state.user._id
    }
    return object
}

class Recipe extends Component {

    componentDidMount() {
        // first fetch going to remove
        fetch(backend + '/user/login?email=test&password=test', {
                method: 'GET',
            }
        ).then((res) => {
            return res.json()
        }).then((data) => {
            this.props.login(data)
            fetch(backend + '/order/get-recipe-order-by-userid?user_id=' + this.props.userid, {method: 'GET'}).then((res) => {
                return res.json()
            }).then((data)=> {
                console.log(data)
                this.props.loadOrder(data)
            })
        }).catch((e) => {
            console.log(e)
            // console.log(e.response.data)
        })
    }

    placeOrder = (obj) => {
        var copy = {
            ...obj, food: this.props.data, time: new Date().toString(), user: {
                geo: {lat: 0, long: 0},
                more: window.navigator.userAgent
            }
        };
        navigator.geolocation.getCurrentPosition(data => {
            copy.user.geo.lat = data.coords.latitude;
            copy.user.geo.long = data.coords.longitude
        });
        if (this.props.data.length > 0) {
            axios.post("https://twobrother0927.firebaseio.com/.json", copy).then(() => alert("Your Order is Placed!"));
        } else {
            alert("Please select some items from Menu first");
        }
    }


    render() {
        return (
            <div className="OrderOnline">
                <section className="Order">
                    <Toolbar count={this.props.count}/>
                    <p className="OrderHead">Recipe Order</p>
                </section>
                <section className="Orderitems">
                    <RecipeOrders/>
                </section>
                <Footer/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
