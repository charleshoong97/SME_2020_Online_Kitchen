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
import axios from 'axios'
import { setUserSession } from './SessionAccess'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      retypepassword: '',
      address: '',
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
    const body = {
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
    }
    axios
      .post('https://sme-backend.herokuapp.com/user/signup', body)
      .then((response) => {
        if (response.data._id) {
          //suceess
          //add redux with response.data   (user object)
          alert('account created successfully')
        }
      })
      .catch((error) => {
        alert(JSON.stringify(error.response.data))
      })
  }

  render() {
    return (
      <div>
        <Modal centered={true} isOpen={this.props.open} className="modal_css">
          <ModalHeader
            toggle={() => {
              this.props.onToggle()
            }}
          >
            Sign Up
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
            <Label for="examplePassword">Retype Password</Label>
            <Input
              type="password"
              name="retypepassword"
              placeholder="retype password"
              onChange={(e) => {
                this.setState({
                  retypepassword: e.target.value,
                })
              }}
            />
            <Label for="exampleEmail">Address</Label>
            <Input
              type="email"
              name="address"
              placeholder="address"
              onChange={(e) => {
                this.setState({
                  address: e.target.value,
                })
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() => {
                if (
                  !this.state.email ||
                  !this.state.password ||
                  !this.state.retypepassword ||
                  !this.state.address
                ) {
                  alert('please fill up all field')
                } else if (!this.validateEmail(this.state.email)) {
                  alert('Invalid email format')
                } else if (!this.isPasswordValid()) {
                  alert('Password must be greater than 6 character')
                } else if (this.state.password != this.state.retypepassword) {
                  alert('Password do not match')
                } else {
                  this.submit()
                }
              }}
            >
              Sign up
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default SignUp
