import React, { Component } from "react";
import NavigationHome from './NavigationHome'
import { Container} from 'react-bootstrap';
import Footer from './Footer';
// import FormPreferences from './FormPreferences';



export default class SignUp extends Component {


    render() {

        const formm={
            marginTop:"10%",
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '450px',
            background: '#dee2e6',
            boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
            padding: '40px 55px 45px 55px',
            borderRadius: '15px',
            transition: 'all .3s',
        };

        async function getToken(email, pass){
            try{
                await fetch('http://localhost:8000/api/users/register', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                    "user":{
                        'email': email,
                        'password': pass
                    
                        }
                    })
                })
                .then((response) => {
                    localStorage.setItem('statusToken', response.status);
                    // console.log(response.status);
                    if(!response.ok){
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json(); 

                })
                .then((myJson) => {
                    localStorage.setItem('token',myJson.user.token);
                    console.log(myJson.user);
                    return myJson.user.token;
                });

            }
            catch(err){
                console.log(err);
                return 0;
            }
        }

        const handleSubmit = (event) =>  {

            event.preventDefault()

            var email = this.inputEmail.value;
            var pass = this.inputPassword.value;
            console.log(email);
            console.log(pass);

            getToken(email, pass);
            this.props.history.push('/form');
        }

        return (
        <Container>
            <NavigationHome />
            <form style={formm} onSubmit={this.handleSubmit}>
                <h3 style={{"fontWeight":"bold", "textDecoration":"underline",  "textAlign":"center"}}>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="first_name" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" name="last_name" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" ref={node => (this.inputEmail = node)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" ref={node => (this.inputPassword = node)}/>
                </div>
         
                <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? <a href="/home">sign in</a>
                </p>
              
            </form>
            <Footer />
        </Container>    
       
        );
    }
}