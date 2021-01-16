import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, NavbarBrand, Button } from 'reactstrap'
import LogIn from '../../Authentication/LogIn'
import SignUp from '../../Authentication/SignUp'
import './NavBar.css'

class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: false,
      signup: false,
    }
  }

  openLogin = () => {
    this.setState({
      login: true,
    })
  }

  openSignup = () => {
    this.setState({
      signup: true,
    })
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Two Brothers</NavbarBrand>
        <div className="AuthButton_Conatiner">
          <Button outline className="Auth_Button" onClick={this.openLogin}>
            Log In
          </Button>
          <Button outline className="Auth_Button" onClick={this.openSignup}>
            Sign Up
          </Button>
        </div>

        <LogIn open={this.state.login} />
        <SignUp open={this.state.signup} />
      </Navbar>
    )
  }
}

export default NavBar
