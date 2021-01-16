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
//import { Formik, Form } from 'formik'
import './Authentication.css'

class LogIn extends Component {
  constructor(props) {
    super(props)

    this.setState({
      email: this.useFormInput(''),
      password: this.useFormInput(''),
    })
  }

  useFormInput = (initialValue) => {
    const value = initialValue
    const setValue = initialValue

    const handleChange = (e) => {
      setValue(e.target.value)
    }
    return {
      value,
      onChange: handleChange,
    }
  }

  render() {
    return (
      <div>
        <Modal centered isOpen={this.props.open} className="modal_css">
          <ModalHeader>Log In</ModalHeader>
          <ModalBody>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" placeholder="abc@gmail.com" />
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" placeholder="password" />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default LogIn
