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
  Row,
  Col,
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
      openAlert: false,
      alertMessage: '',
      openSuccessAlert: false,
    }
  }

  toggleAlert = () => {
    this.setState({
      openAlert: !this.state.openAlert,
    })
  }

  toggleSuccessAlert = () => {
    this.setState({
      openSuccessAlert: !this.state.openSuccessAlert,
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
          this.setState({
            openSuccessAlert: true,
          })
          this.props.onToggle()
          this.props.openLogin(true)
          //alert('Account created successfully.')
        }
      })
      .catch((error) => {
        this.setState({
          openAlert: true,
          alertMessage: error.response.data,
        })

        //alert(JSON.stringify(error.response.data))
      })
  }

  render() {
    return (
      <div>
        <Modal centered={true} isOpen={this.props.open} backdrop="static">
          <ModalHeader
            toggle={() => {
              this.props.onToggle()
            }}
          >
            Sign Up
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

              <Row>
                <Col>
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
                </Col>
                <Col>
                  <div style={{ paddingBottom: 15 }}>
                    <Label for="examplePassword">Retype Password</Label>
                    <Input
                      type="password"
                      name="retypepassword"
                      placeholder="Retype Password"
                      onChange={(e) => {
                        this.setState({
                          retypepassword: e.target.value,
                        })
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <div style={{ paddingBottom: 15 }}>
                <Label for="exampleEmail">Address</Label>
                <Input
                  type="textarea"
                  name="address"
                  placeholder="Address"
                  onChange={(e) => {
                    this.setState({
                      address: e.target.value,
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
              <Alert
                color="success"
                isOpen={this.state.openSuccessAlert}
                toggle={this.toggleSuccessAlert}
              >
                Sign up successfully.
              </Alert>
            </Form>
          </ModalBody>
          <ModalFooter style={{ alignSelf: 'center' }}>
            <Button
              color="primary"
              style={{ width: 450 }}
              onClick={() => {
                if (
                  !this.state.email ||
                  !this.state.password ||
                  !this.state.retypepassword ||
                  !this.state.address
                ) {
                  this.setState({
                    openAlert: true,
                    alertMessage: 'Please fill up all the fields.',
                  })
                  //alert('please fill up all field')
                } else if (!this.validateEmail(this.state.email)) {
                  this.setState({
                    openAlert: true,
                    alertMessage: 'Invalid email format.',
                  })
                  //alert('Invalid email format')
                } else if (!this.isPasswordValid()) {
                  this.setState({
                    openAlert: true,
                    alertMessage: 'Password must be greater than 6 characters.',
                  })
                  //alert('Password must be greater than 6 characters')
                } else if (this.state.password != this.state.retypepassword) {
                  this.setState({
                    openAlert: true,
                    alertMessage: 'Password do not match.',
                  })
                  //alert('Password do not match')
                } else {
                  this.submit()
                }
              }}
            >
              Sign Up
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default SignUp
