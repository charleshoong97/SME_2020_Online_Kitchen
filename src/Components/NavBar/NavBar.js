import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, NavbarBrand, Button } from 'reactstrap'
import LogIn from '../../Authentication/LogIn'
import SignUp from '../../Authentication/SignUp'
import './NavBar.css'
import { connect } from 'react-redux'
import { clearRedux } from '../../Redux/Action/User'

const mapDispatchToProps = { clearRedux }

const mapStateToProps = (state) => {
  return { user: state.user }
}

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

  signout = () => {
    this.props.clearRedux()
  }

  render() {
    console.log(this.props.user)
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Two Brothers</NavbarBrand>

        {this.props.user._id == undefined ? (
          <div className="AuthButton_Conatiner">
            <Button outline className="Auth_Button" onClick={this.toggleLogin}>
              Log In
            </Button>
            <Button outline className="Auth_Button" onClick={this.toggleSignup}>
              Sign Up
            </Button>
          </div>
        ) : (
          <div className="AuthButton_Conatiner">
            <Button outline className="Auth_Button"
                    href="/#/setting">
              Edit Account
            </Button>
            <Button outline className="Auth_Button" onClick={this.signout}>
              Sign Out
            </Button>
          </div>
        )}

        <LogIn open={this.state.login} onToggle={this.toggleLogin} />
        <SignUp
          open={this.state.signup}
          onToggle={this.toggleSignup}
          openLogin={(login) => this.setState({ login: login })}
        />
      </Navbar>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
