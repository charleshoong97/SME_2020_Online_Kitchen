import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Text,
    Row
} from 'reactstrap';
import RecipeOrders from "../../Components/Recipe/Orders/RecipeOrders";
import { backend } from "../../Utils/Constants";
import { connect } from "react-redux";
import { login } from "../../Redux/Action/User";
import { loadOrder } from "../../Redux/Action/RecipeOrder";

const mapDispatchToProps = {
    login,
    loadOrder
};

const mapStateToProps = (state) => {
    let object = {
        userid: '',
    }
    if (state.user != null) {
        object.userid = state.user._id
    }
    return object
}

class Admin extends Component {
    componentDidMount() {
        // first fetch going to remove
        fetch(backend + '/user/login?email=admin&password=admin', {
            method: 'GET',
        }
        ).then((res) => {
            return res.json()
        }).then((data) => {
            this.props.login(data)
            fetch(backend + '/order/get-all-recipe-order', { method: 'GET' }).then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data)
                this.props.loadOrder(data)
            })
        }).catch((e) => {
            console.log(e)
        })
    }

    render() {
        return (
            <div>
                <Navbar color="dark">
                    <NavbarBrand>
                        <h3 className="text-white">
                            <strong>Admin Dashboard</strong>
                        </h3>
                    </NavbarBrand>

                    <div expand="md">
                        <Button color="primary">Reset Password</Button>
                        <Button color="primary">Logout</Button>
                    </div>
                </Navbar>

                <section className="Orderitems">
                    <RecipeOrders />
                </section>
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
