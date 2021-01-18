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

  toggleLogin = () => {
    let closeSignUp = false
    if (!this.state.login === true) {
      closeSignUp = true
    }
    this.setState({
      login: !this.state.login,
      signup: closeSignUp ? false : this.state.signup,
    })
  }

  toggleSignup = () => {
    let closeLogin = false
    if (!this.state.signup === true) {
      closeLogin = true
    }
    this.setState({
      login: closeLogin ? false : this.state.login,
      signup: !this.state.signup,
    })
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Two Brothers</NavbarBrand>
        <div className="AuthButton_Conatiner">
          <Button outline className="Auth_Button" onClick={this.toggleLogin}>
            Log In
          </Button>
          <Button outline className="Auth_Button" onClick={this.toggleSignup}>
            Sign Up
          </Button>
        </div>

        <LogIn open={this.state.login} onToggle={this.toggleLogin} />
        <SignUp open={this.state.signup} onToggle={this.toggleSignup} />
      </Navbar>
    )
  }
}

export default NavBar
