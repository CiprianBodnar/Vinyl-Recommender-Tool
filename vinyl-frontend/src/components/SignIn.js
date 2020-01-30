import React, {Component} from 'react';
// import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Container} from 'react-bootstrap';


// const BtnSpotify = styled.button`
//     margin:5px;
//     width: 100px;
//     height:50px;
//     border-radius: 4px;
//     background: #33cc33;
//     color:white;
//     border:0px transparent;
//     text-align: center;
//     margin-left: 100%;

//     &:hover{
//         background: #3b5998;
//         opacity: 0.6;
//     }`  

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            referrer: null,
        };
    }

    handleClickLogin = () => {
        this.setState({referrer: '/profile/user'});
    }

    render() {

        const{referrer} = this.state;
        if (referrer) return <Redirect to={referrer} />;
        
        const formm={
            width: '450px',
            margin: 'auto',
            background: '#dee2e6',
            fontColor: 'white',
            boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
            padding: '40px 55px 45px 55px',
            borderRadius: '15px',
            transition: 'all .3s',
            height: '480px',
        };

        return (
        <Container>
            <form style={formm}>
                <h3 style={{"fontWeight":"bold", "textDecoration":"underline",  "textAlign":"center"}}>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <p className="forgot-password text-right">
                    Forgot <a href="/"> password?</a>
                </p>
                <button onClick={this.handleClickLogin} id="myButton" type="submit" className="btn btn-primary btn-block">Sign in</button>
                <p className="not-account text-center">Don't have an account? <a href='/signup'>Sign up</a></p>
                
{/* 
                <div className="column">  
                    <BtnSpotify>
                        &nbsp;&nbsp;Sign In with Spotify
                    </BtnSpotify >
                </div> */}
            </form>
        </Container>   
        );
    }
}