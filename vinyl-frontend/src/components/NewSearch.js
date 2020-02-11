import React, { Component } from "react";
import NavigationLogged from './NavigationLogged';
import { Container} from 'react-bootstrap';
import Footer from './Footer';
import AutoCompleteText from './AutoCompleteText';
import musicGenres from "./music-genres";

export default class NewSearch extends Component { 


  render() {
        const formm={
            width: '80%',
            marginTop:"10%",
            marginLeft: 'auto',
            marginRight: 'auto',
            background: '#dee2e6',
            boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
            padding: '40px 55px 45px 55px',
            borderRadius: '15px',
            transition: 'all .3s',
        };
        const drop_choosee = {
            fontSize: '30px',
        };

        const drop_choose = {
            fontSize: '20px',
            fontWeight: 'bold',
        };


    return (
        <Container>
            <NavigationLogged />
            <form method="GET" style={formm}>         
                <div >
                    <h2 style={{"fontWeight":"bold", "textDecoration":"underline",  "textAlign":"center"}}>Tell us what you like!</h2>
                </div>
                <br/><br/>
            
                <div className="App-Component">
                <AutoCompleteText items={musicGenres}/>
                </div>
            </form>
            <Footer />
        </Container> 
    );
  }
}




