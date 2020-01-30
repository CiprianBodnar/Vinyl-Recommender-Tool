import React, { Component } from "react";
import NavigationHome from './NavigationHome';
import { Container} from 'react-bootstrap';
import Footer from './Footer';

export default class FormPreferences extends Component {

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

    
        async function loginSpotify(){

            const url = 'http://localhost:8000/api/users/login';
            fetch(url)
            .then(data =>{
                localStorage.setItem('statusSpoty', data.status);
                return data.json();
            })
            .then(res=>{console.log(res)})
        }


        async function getPreferences(artists, genres){

            var tok = localStorage.getItem('token');
            var inputToken = "Token "+ tok;

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
                              "text_question": "Artists",
                              "answer": artists
                            }
                          },
                           {
                            "question": {
                              "text_question": "Genre",
                              "answer": genres
                            }
                          }
                        ]
                      })
                })
                .then(function(response) {
                    localStorage.setItem('statusPreferences', response.status);

                    if(!response.ok){
                        throw new Error("HTTP status " + response.status);
                    }
                });
        }

    
        const handleFormSubmit = (event) =>  {

            event.preventDefault()

            var artists = [];
            var inputArtist = document.getElementsByClassName('artist');
            for(var i=0; inputArtist[i]; ++i){
                if(inputArtist[i] != null){
                    artists.push(inputArtist[i].value)
                }
            }
            localStorage.setItem("artistsPref", JSON.stringify(artists));
            // var storedNames = JSON.parse(localStorage.getItem("names"));

            var checkedGenre = [];
            var inputElements = document.getElementsByClassName('genre');
            for(var j=0; inputElements[j]; ++j){
                if(inputElements[j].checked){
                    checkedGenre.push(inputElements[j].value);
                }
            }
            localStorage.setItem("genrePref", JSON.stringify(checkedGenre));

            getPreferences(artists, checkedGenre);
            loginSpotify();
            // window.location.replace("http://localhost:8000/api/users/login");
        }

           
        return (
        <Container>
            <NavigationHome />
            <form method="GET" style={formm}>
                
                 <div >
                    <h2 style={{"fontWeight":"bold", "textDecoration":"underline",  "textAlign":"center"}}>Tell us what you like!</h2>
                    {/* <h3>Music will describe you.</h3> */}
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
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Punk" name="Punk" />Punk <br/>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Country" name="Conutry" />Country<br/>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Jazz" name="Jazz" />Jazz<br/>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Rock" name="Rock" />Rock<br/>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Folk" name="Folk" />Folk<br/>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Latino" name="Latino" />Latino<br/>
                </div>
                <br/>

                <label  style={drop_choose}>Complete your favorite artists:</label>
                <p>Eg. Luciano Pavarotti, Solomun</p>
                <input className="artist" type = "Text" id="artist1" ref={node => (this.artist1 = node)}></input><br/> 
                <input className="artist" type = "Text" id="artist2" ref={node => (this.artist2 = node)}></input> <br/>
                <input className="artist" type = "Text" id="artist3" ref={node => (this.artist3 = node)}></input> <br/>
                <input className="artist" type = "Text" id="artist4" ref={node => (this.artist4 = node)}></input> <br/>

                <br/>
                <button onClick={handleFormSubmit} type="submit" className="btn btn-primary btn-block"> Next Step</button>
                
            </form>
            <Footer />
        </Container>    
       
        );
    }
}