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
                    <div expand="md">
                        <Button color="primary">Reset Password</Button>
                        <Button color="primary">Logout</Button>
                    </div>

                </Navbar>
            </div >
        );
    }
}

export default Admin;