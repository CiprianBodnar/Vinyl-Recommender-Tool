import React, { Component } from "react";
import {DropdownButton, MenuItem} from 'react-bootstrap';
import NavigationHome from './NavigationHome';
import { Container} from 'react-bootstrap';
import Footer from './Footer';

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
        return (
        <Container>
            <NavigationHome />
            <form style={formm}>
                <h3>Tell us what you like!</h3>
                <p>Music will describe you.</p>
                <div>style="text-align:center">
                    <h2>Can we guess your taste in music?</h2>
                    <p>Write short answers:</p>
                </div>

                <label for="country">Country</label>
                    <select id="country" name="country">
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                        <option value="england">England</option>
                        <option value="belgium">Belgium</option>
                        <option value="romania">Romania</option>
                        <option value="russia">Russia</option>
                        <option value="germany">Germany</option>
                        <option value="italy">Italy</option>
                    </select>

                <label for="music">Choose your favorite genre of music:</label>
                <select id="music" name="music">
                    <option value="pop">Pop</option>
                    <option value="hip-hop">Hip-Hop</option>
                    <option value="rap">Rap</option>
                    <option value="country">Country</option>
                    <option value="jazz">Jazz</option>
                    <option value="rock">Rock</option>
                    <option value="folk">Folk</option>
                    <option value="latino">Latino</option>
                    <option value="electronic">Electronic</option>
                </select>
                <label for="describe">How would you describe yourself?</label>
                <textarea id="describe" name="describe" placeholder="Write something.." style="height:170px"></textarea>
        

                <button type="submit" className="btn btn-primary btn-block">Register</button>
                
            </form>
            <Footer />
        </Container>    
       
        );
    }
}