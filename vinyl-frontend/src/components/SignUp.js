import React, { Component } from "react";
import NavigationHome from './NavigationHome'
import { Container} from 'react-bootstrap';
import Footer from './Footer';
// import FormPreferences from './FormPreferences';

export default class SignUp extends Component {

    
    render() {
        const formm={
            width: '450px',
            margin: 'auto',
            background: '#ffffff',
            boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
            padding: '40px 55px 45px 55px',
            borderRadius: '15px',
            transition: 'all .3s',
        };

        const handleSubmit = (event) =>  {

            event.preventDefault()
            // console.log(event.target[0].value)
            // console.log(event.target.elements.email.value)
            // console.log(event.target.email.value)
            var email = this.inputEmail.value;
            var pass = this.inputPassword.value;
            console.log(email)
            console.log(pass)

            async function getToken(){
            const response = await fetch('http://localhost:8000/api/users/register', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                    "user":{
                         'email': email,
                         'password': pass
                    
                         }
                     })
                })

                const content = await response.json();
                // console.log(content.user.token);
                return await content.user.token;
                }

                var res = getToken();
                console.log(res);
            }
        return (
        <Container>
            <NavigationHome />
            <form style={formm} onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

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
                    Already registered? <a href="/signin">sign in</a>
                </p>
                <p className="forgot-password text-right">
                    Complete this <a href="/form">form</a> to know you better.
                </p>
            </form>
            <Footer />
        </Container>    
       
        );
    }
}