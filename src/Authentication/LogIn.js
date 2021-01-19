import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Col,
  Row,
} from 'reactstrap'
import './Authentication.css'
import { login } from '../Redux/Action/User'
import { setUserSession } from './SessionAccess'
import axios from 'axios'
import { connect } from 'react-redux'

const mapDispatchToProps = {
  login,
}

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      openAlert: false,
      alertMessage: '',
    }
  }

  toggleAlert = () => {
    this.setState({
      openAlert: !this.state.openAlert,
    })
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  isPasswordValid() {
    let isValid = false
    if (this.state.password.length >= 6) {
      isValid = true
    }
    return isValid
  }

  submit() {
    axios
      .get(
        'https://sme-backend.herokuapp.com/user/login?email=' +
          this.state.email +
          '&password=' +
          this.state.password
      )
      .then((response) => {
        const userData = response.data
        //console.log(userData)
        if (userData != null) {
          this.props.login(userData)
          this.props.onToggle()
          //alert('login success')
        } else {
          this.setState({
            openAlert: true,
            alertMessage: 'Wrong email or password',
          })
          //alert('Wrong email or password')
        }
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }

  render() {
    return (
      <Modal centered={true} isOpen={this.props.open} backdrop="static">
        <ModalHeader
          toggle={() => {
            this.props.onToggle()
          }}
        >
          Log In
        </ModalHeader>
        <ModalBody>
          <Form>
            <div style={{ paddingBottom: 15 }}>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="e.g.,abc@gmail.com"
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  })
                }}
              />
            </div>
            <div style={{ paddingBottom: 15 }}>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  })
                }}
              />
            </div>
            <Alert
              color="danger"
              isOpen={this.state.openAlert}
              toggle={this.toggleAlert}
            >
              {this.state.alertMessage}
            </Alert>
          </Form>
        </ModalBody>
        <ModalFooter style={{ alignSelf: 'center' }}>
          <Button
            color="success"
            style={{ width: 450 }}
            onClick={() => {
              if (this.state.email != 'admin') {
                if (!this.state.email || !this.state.password) {
                  this.setState({
                    openAlert: true,
                    alertMessage: 'Please fill up email and password.',
                  })
                  // alert('Please fill up email and password')
                } else if (!this.validateEmail(this.state.email)) {
                  this.setState({
                    openAlert: true,
                    alertMessage: 'Invalid Email format.',
                  })
                  //alert('Invalid Email format')
                } else if (!this.isPasswordValid()) {
                  this.setState({
                    openAlert: true,
                    alertMessage: 'Password must be more than 6 characters.',
                  })
                  //alert('Password must be more than 6 characters')
                } else {
                  this.submit()
                }
              } else {
                if (this.state.password == 'admin') this.submit()
                else {
                  this.setState({
                    openAlert: true,
                    alertMessage: 'Incorrect Password.',
                  })
                }
              }
            }}
          >
            Login
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LogIn)
