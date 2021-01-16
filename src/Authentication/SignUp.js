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

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.setState({
      email: this.useFormInput(''),
      password: this.useFormInput(''),
      retypepassword: this.useFormInput(''),
      address: this.useFormInput(''),
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
        <Modal isOpen={this.props.open} toggle={this.toggle}>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalBody>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" placeholder="abc@gmail.com" />
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" placeholder="password" />
            <Label for="examplePassword">Retype Password</Label>
            <Input
              type="password"
              name="retypepassword"
              placeholder="retype password"
            />
            <Label for="exampleEmail">Address</Label>
            <Input type="email" name="address" placeholder="address" />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default SignUp
