import React, { Component } from "react";
import NavigationHome from './NavigationHome';
import { Container} from 'react-bootstrap';
import Footer from './Footer';

export default class FormPreferences extends Component {


    render() {

        const formm={
            width: '550px',
            margin: 'auto',
            background: '#ffffff',
            boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
            padding: '40px 55px 45px 55px',
            borderRadius: '15px',
            transition: 'all .3s',
        };
        const drop_choosee = {
            fontSize: '20px',
        };

        const drop_choose = {
            fontSize: '20px',
            fontWeight: 'bold',
        };

        async function getPreferences(artists, genres){

            var tok = localStorage.getItem('token');
            var inputToken = "Token "+ tok;
            console.log(inputToken);

            await fetch('http://localhost:8000/api/question/submit', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": inputToken
                },
                body: JSON.stringify(
                    {
                        "questions": [
                          {
                            "question": {
                              "text_question": "What 2 bla",
                              "answer": artists
                            }
                          },
                           {
                            "question": {
                              "text_question": "What bla lbabla",
                              "answer": genres
                            }
                          }
                        ]
                      })
                })
                .then(function(response) {
                    localStorage.setItem('statusPreferences', response.status);
                    console.log(response.status);
                    if(!response.ok){
                        throw new Error("HTTP status " + response.status);
                    }
                });
        }

    
        const handleFormSubmit = (event) =>  {

            event.preventDefault()

            var country = document.getElementById("country");
            var countryUser = country.options[country.selectedIndex].value;
            console.log(countryUser);

            var artists = [];
            var inputArtist = document.getElementsByClassName('artist');
            for(var i=0; inputArtist[i]; ++i){
                if(inputArtist[i] != null){
                    artists.push(inputArtist[i].value)
                }
            }
            console.log(artists);

            var checkedGenre = [];
            var inputElements = document.getElementsByClassName('genre');
            for(var j=0; inputElements[j]; ++j){
                if(inputElements[j].checked){
                    checkedGenre.push(inputElements[j].value);
                }
            }
            // console.log(checkedGenre);

            getPreferences(artists, checkedGenre);
            // .then((data) => {
            //     // console.log(data);
            // });

            this.props.history.push('/profileUser');

        }

           
        return (
        <Container>
            <NavigationHome />
            <form method="GET" style={formm}>
                 <div >
                    <h2>Tell us what you like!</h2>
                    <h3>Music will describe you.</h3>
                </div>
                <br/>

                <label style={drop_choose}>Country</label>
                <div style={drop_choose}>
                    <select id="country" name="country">
                        <option value="Australia">Australia</option>
                        <option value="Canada">Canada</option>
                        <option value="Usa">USA</option>
                        <option value="England">England</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russia</option>
                        <option value="Germany">Germany</option>
                        <option value="Italy">Italy</option>
                        <option value='Other'>Other</option>
                    </select>
                 </div>

                <br/>
            
                <label style={drop_choose}>Choose your favorite genre of music:</label>
                <div style={drop_choosee}>
                        <input className="genre" type="checkbox" value="pop" name="pop" />Pop<br/>
                        <input className="genre" type="checkbox" value="hiphop" name="hiphop" />Hip-Hop<br/>
                        <input className="genre" type="checkbox" value="country" name="conutry" />Country<br/>
                        <input className="genre" type="checkbox" value="jazz" name="jazz" />Jazz<br/>
                        <input className="genre" type="checkbox" value="rock" name="rock" />Rock<br/>
                        <input className="genre" type="checkbox" value="folk" name="folk" />Folk<br/>
                        <input className="genre" type="checkbox" value="latino" name="latino" />Latino<br/>
                        <input className="genre" type="checkbox" value="electro/house" name="electro/house" />Electro/House<br/>
                </div>
                <br/>

                <label  style={drop_choose}>Complete your favorite artists:</label>
                <p>Eg. Justin Bieber, Luciano Pavarotti, Solomun</p>
                <input className="artist" type = "Text" id="artist1" ref={node => (this.artist1 = node)}></input><br/> 
                <input className="artist" type = "Text" id="artist2" ref={node => (this.artist2 = node)}></input> <br/>
                <input className="artist" type = "Text" id="artist3" ref={node => (this.artist3 = node)}></input> <br/>
                <input className="artist" type = "Text" id="artist4" ref={node => (this.artist4 = node)}></input> <br/>


                <br/>
                <button onClick={handleFormSubmit} type="submit" className="btn btn-primary btn-block"> Register</button>
                
            </form>
            <Footer />
        </Container>    
       
        );
    }
}