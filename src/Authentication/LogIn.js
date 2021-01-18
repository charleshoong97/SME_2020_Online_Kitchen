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
} from 'reactstrap'
import './Authentication.css'
import { setUserSession } from './SessionAccess'
import axios from 'axios'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
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
        if (userData != null) {
          //suceesss
          //add redux here with userData  (user object)
          alert('login success')
        } else {
          alert('Wrong email or password')
        }
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }

  render() {
    return (
      <Modal centered={true} isOpen={this.props.open} className="modal_css">
        <ModalHeader
          toggle={() => {
            this.props.onToggle()
          }}
        >
          Log In
        </ModalHeader>
        <ModalBody>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="abc@gmail.com"
            onChange={(e) => {
              this.setState({
                email: e.target.value,
              })
            }}
          />
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => {
              this.setState({
                password: e.target.value,
              })
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              if (!this.state.email || !this.state.password) {
                alert('Please fill up email and password')
              } else if (!this.validateEmail(this.state.email)) {
                alert('Invalid Email format')
              } else if (!this.isPasswordValid()) {
                alert('Password must be more than 6 character')
              } else {
                this.submit()
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

export default LogIn
