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
    Text
} from 'reactstrap';

class Admin extends Component {
    render() {
        return (
            <div>
                <Navbar color="light">
                    <NavbarBrand href="/admin">Admin Dashboard</NavbarBrand>
                    <Button color="primary">Logout</Button>
                </Navbar>
            </div >
        );
    }
}

export default Admin;