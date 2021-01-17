import React, { Component } from 'react'
import {
    Button,
    Label,
    Input,
    Card,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap'
import './Authentication.css'
import axios from "axios";

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state={
            email: '',
            address:'',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        }
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
        if(this.state.oldPassword=='testtest'){
            isSame=true
        }
        return isSame
    }

    profileSubmit(){
        //load from redux
        const body={
            user_id:"6001c30aeda8030015cf71e0",
            email: this.state.email,
            address: this.state.address,
        }
        axios.put('https://sme-backend.herokuapp.com/user/update',body).then(response => {

            const userData=response.data
            if(userData!=null){

                //suceesss
                //add redux here with userData  (user object)
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
            user_id:"6001c30aeda8030015cf71e0",
            password: this.state.newPassword,
        }
        axios.put('https://sme-backend.herokuapp.com/user/update',body).then(response => {

            const userData=response.data
            if(userData!=null){

                //suceesss
                //add redux here with userData  (user object)
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
                        <Input type="email" name="email" placeholder="abc@gmail.com"
                               style={{width:500, alignSelf:'center'}}
                               onChange={(e)=>{this.setState({
                                   email: e.target.value
                               })}}
                        />
                        <Label for="address">Delivery Address</Label>
                        <Input type="text" name="Delivery Address" placeholder="Delivery Address" style={{width:500, alignSelf:'center'}}
                               onChange={(e)=>{this.setState({
                                   address: e.target.value
                               })}}
                        />

                        <Button color="primary" style={{marginTop:50, width:600, alignSelf:'center'}}
                        onClick={()=>{
                            if(!this.state.email||!this.state.email){
                                alert('Please fill in all field')
                            }else if (!this.validateEmail()){
                                alert('Invalid Email Format')
                            }else {
                                this.profileSubmit()
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

                        <Button color="primary" style={{marginTop:50, width:600, alignSelf:'center'}}
                        onClick={()=>{
                            if(!this.state.oldPassword||!this.state.newPassword||!this.state.confirmNewPassword){
                                alert('Please fill in all the field')
                            }else if(!this.isPasswordValid()){
                                alert('Password must be greater than 6 character')
                            }else if (!this.isPasswordMatch()){
                                alert('Confirm password do not match with new password')
                            }else if (!this.isOldPasswordMatch()){
                                alert('Incorrect old password')
                            }else {
                                this.passwordSubmit()
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

export default EditProfile
