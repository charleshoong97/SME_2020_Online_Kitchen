import React, { Component } from 'react'
import {
    Button,
    Label,
    Input,
    Card,
    CardBody,
    CardTitle,
    CardText, Alert, Form
} from 'reactstrap'
import './Authentication.css'
import axios from "axios";
import { connect } from 'react-redux'
import {login} from "../Redux/Action/User";

const mapStateToProps = (state) => {
return state

}

const mapDispatchToProps = {
    login,
}

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state={
            email: this.props.user.email,
            address:this.props.user.address,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            openDetailsAlert: false,
            detailsAlertMessage: '',
            openPasswordAlert: false,
            passwordAlertMessage: '',
        }
    }

    toggleDetailsAlert = () => {
        this.setState({
            openDetailsAlert: !this.state.openDetailsAlert,
        })
    }
    togglePasswordAlert = () => {
        this.setState({
            openPasswordAlert: !this.state.openPasswordAlert,
        })
    }

    validateEmail() {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
    }

    isPasswordValid(){
        let isValid=false;
        if(this.state.oldPassword.length>=6&&this.state.newPassword.length>=6){
            isValid=true
        }
        return isValid
    }

    isPasswordMatch(){
        let isSame=false;
        if(this.state.newPassword==this.state.confirmNewPassword){
            isSame=true
        }
        return isSame
    }

    isOldPasswordMatch(){
        //load old password from redux
        let isSame=false;
        if(this.state.oldPassword==this.props.user.password){
            isSame=true
        }
        return isSame
    }

    profileSubmit(){
        //load from redux
        const body={
            user_id:this.props.user._id,
            email: this.state.email,
            address: this.state.address,
        }
        axios.put('https://sme-backend.herokuapp.com/user/update',body).then(response => {

            const userData=response.data
            if(userData!=null){

                //suceesss
                //add redux here with userData  (user object)
                this.props.login(userData)
                alert('update success')
            }else{
                alert('')
            }
        }).catch(error => {
            alert(JSON.stringify(error))
        })
    }

    passwordSubmit(){
        //load from redux
        const body={
            user_id:this.props.user._id,
            password: this.state.newPassword,
        }
        axios.put('https://sme-backend.herokuapp.com/user/update',body).then(response => {

            const userData=response.data
            if(userData!=null){

                //suceesss
                //add redux here with userData  (user object)
                this.props.login(userData)
                alert('update password success')
            }else{
                alert('')
            }
        }).catch(error => {
            alert(JSON.stringify(error))
        })
    }



    render() {
        return (

                <>
                    <Card body>
                        <CardTitle tag="h1">Personal details</CardTitle>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email"
                               placeholder="Email"
                               value={this.state.email}
                               style={{width:500, alignSelf:'center'}}
                               onChange={(e)=>{this.setState({
                                   email: e.target.value
                               })}}
                        />
                        <Label for="address">Delivery Address</Label>
                        <Input type="text" name="Delivery Address" placeholder="Delivery Address" style={{width:500, alignSelf:'center'}}
                               value={this.state.address}
                               onChange={(e)=>{this.setState({
                                   address: e.target.value
                               })}}
                        />
                        <Alert
                            color="danger"
                            isOpen={this.state.openDetailsAlert}
                            toggle={()=>{this.toggleDetailsAlert()}}
                            style={{marginTop:20, width:500, alignSelf:'center'}}
                        >
                            {this.state.detailsAlertMessage}
                        </Alert>

                        <Button color="primary" style={{marginTop:20, width:600, alignSelf:'center'}}
                        onClick={()=>{
                            if(!this.state.email||!this.state.email){
                                this.setState({
                                    openDetailsAlert: true,
                                    detailsAlertMessage: 'Please fill in all field',
                                })
                            }else if (!this.validateEmail()){
                                this.setState({
                                    openDetailsAlert: true,
                                    detailsAlertMessage: 'Invalid Email Format',
                                })
                            }else {
                                this.profileSubmit()
                                this.setState({
                                    openDetailsAlert: false,
                                    detailsAlertMessage: '',
                                })
                            }
                        }}
                        >
                            Update Personal Details
                        </Button>
                    </Card>
                    <Card body>
                        <CardTitle tag="h1">Reset Password</CardTitle>

                        <Label >Old Password</Label>
                        <Input type="password" placeholder="Old password"
                               style={{width:500, alignSelf:'center'}}
                               onChange={(e)=>{this.setState({
                                   oldPassword: e.target.value
                                   })}}/>
                        <Label >New Password</Label>
                        <Input type="password" placeholder="New password"
                               style={{width:500, alignSelf:'center'}}
                               onChange={(e)=>{this.setState({
                                   newPassword: e.target.value
                               })}}/>
                        <Label >Confirm New Password</Label>
                        <Input type="password" placeholder="Confirm new password"
                               style={{width:500, alignSelf:'center'}}
                               onChange={(e)=>{this.setState({
                                   confirmNewPassword: e.target.value
                               })}}/>

                        <Alert
                            color="danger"
                            isOpen={this.state.openPasswordAlert}
                            toggle={()=>{this.togglePasswordAlert()}}
                            style={{marginTop:20, width:500, alignSelf:'center'}}
                        >
                            {this.state.passwordAlertMessage}
                        </Alert>
                        <Button color="primary" style={{marginTop:20, width:600, alignSelf:'center'}}
                        onClick={()=>{
                            if(!this.state.oldPassword||!this.state.newPassword||!this.state.confirmNewPassword){
                                this.setState({
                                    openPasswordAlert: true,
                                    passwordAlertMessage: 'Please fill in all the field',
                                })
                            }else if(!this.isPasswordValid()){
                                this.setState({
                                    openPasswordAlert: true,
                                    passwordAlertMessage: 'Password must be greater than 6 character',
                                })
                            }else if (!this.isPasswordMatch()){
                                this.setState({
                                    openPasswordAlert: true,
                                    passwordAlertMessage: 'Confirm password do not match with new password',
                                })
                            }else if (!this.isOldPasswordMatch()){
                                this.setState({
                                    openPasswordAlert: true,
                                    passwordAlertMessage: 'Incorrect old password',
                                })
                            }else {
                                this.passwordSubmit()
                                this.setState({
                                    openPasswordAlert: false,
                                    passwordAlertMessage: '',
                                })
                            }
                        }}
                        >
                            Update Password
                        </Button>
                    </Card>
                </>

        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditProfile)
