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

class Admin extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark">
                    <NavbarBrand href="/admin">
                        <h4 className="text-white">
                            <strong>Admin Dashboard</strong>
                        </h4>
                    </NavbarBrand>

                    <Nav>
                        <NavItem>
                            <NavLink href="/admin/order">Recipe Order</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/admin/password">Reset Password</NavLink>
                        </NavItem>
                    </Nav>

                    <Button color="primary">Logout</Button>
                </Navbar>
            </div >
        );
    }
}

export default Admin;