import React, {Component} from 'react';
import styled, { css } from 'styled-components';



const BtnFacebook = styled.button`
    width: 110px;
    height:50px;  
    border-radius: 4px;
    background: #1E90FF;
    color:white;
    border:0px transparent;  
    text-align: center;
    margin:5px;
    display: inline-block;

    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }`;

const BtnGoogle = styled.button`
    margin:5px;
    margin-left:10px;
    width: 100px;
    height:50px;
    border-radius: 4px;
    background: #db3236;
    color:white;
    border:0px transparent;
    text-align: center;

    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }`    

const BtnSpotify = styled.button`
    margin:5px;
    width: 100px;
    height:50px;
    border-radius: 4px;
    background: #33cc33;
    color:white;
    border:0px transparent;
    text-align: center;

    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }`  

export default class SignIn extends Component {
    render() {
        return (
            <form>
                <h3>Sign In</h3>

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

                <div class="column">    
                    <BtnFacebook >
                        &nbsp;&nbsp;Sign In with Facebook
                        </BtnFacebook >
                </div>
                <div class="column">  
                    <BtnGoogle>
                        &nbsp;&nbsp;Sign In with Google
                    </BtnGoogle >
                </div>

                <div class="column">  
                    <BtnSpotify>
                        &nbsp;&nbsp;Sign In with Spotify
                    </BtnSpotify >
                </div>


                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}