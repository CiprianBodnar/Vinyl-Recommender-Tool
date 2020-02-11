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

            const url = 'http://localhost:8000/api/sparql/login';
            let req = new Request(url, {
                method: 'GET',
                mode: 'cors',
              });
            fetch(req)
            .then((response) => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error('BAD HTTP stuff')
            }
            })
            .then((jsonData) => {

            console.log(jsonData);
        })
        .catch((err) => {
            console.log('ERROR', err.message);
        });  
        }


        async function getPreferences(artists, genres){

            var tok = localStorage.getItem('token');
            var inputToken = "Token "+ tok;

            var inputTextarea = localStorage.getItem('textareaInput');

            await fetch('http://localhost:8000/api/question/submit', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": inputToken
                },
                body: JSON.stringify(
                    {
                        "questions": [
                           {
                            "question": {
                              "text_question": "Genre",
                              "answer": genres
                            }
                          },
                          {
                            "question": {
                              "text_question": "Artists",
                              "answer": artists
                            }
                          },
                          {
                            "question": {
                                "text_question": "Nltk",
                                "answer": inputTextarea
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

            let textVal = document.getElementById("myTextarea").value;
            console.log(textVal);
            localStorage.setItem("textareaInput",textVal);

            var artists = [];
            var inputArtist = document.getElementsByClassName('artist');
            for(var i=0; inputArtist[i]; ++i){
                if(inputArtist[i] != null && inputArtist[i].value.length > 1){
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
            window.location.replace("http://localhost:8000/api/sparql/login");
        }

           
        return (
        <Container>
            <NavigationHome />
            <form method="GET" style={formm}>
                
                 <div >
                    <h2 style={{"fontWeight":"bold", "textDecoration":"underline",  "textAlign":"center"}}>Tell us what you like!</h2>
                </div>
                <br/><br/>
            
                <label style={drop_choose}>Choose your favorite genre of music:</label>
                <div style={drop_choosee}>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Punk" name="Punk" />Punk <br/>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Country" name="Conutry" />Country<br/>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Jazz" name="Jazz" />Jazz<br/>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Rock" name="Rock" />Rock<br/>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Folk" name="Folk" />Folk<br/>
                        <input style={{"width":"20px", "height":"20px"}} className="genre" type="checkbox" value="Latino" name="Latino" />Latino<br/>
                </div> <br/>

                <label  style={drop_choose}>Complete your favorite artists:</label>
                <p>Eg. Luciano Pavarotti, Solomun</p>
                <input className="artist" type = "Text" id="artist1" ref={node => (this.artist1 = node)}></input><br/> 
                <input className="artist" type = "Text" id="artist2" ref={node => (this.artist2 = node)}></input> <br/>
                <input className="artist" type = "Text" id="artist3" ref={node => (this.artist3 = node)}></input> <br/>
                <input className="artist" type = "Text" id="artist4" ref={node => (this.artist4 = node)}></input> <br/> <br/>
                
                <label style={drop_choose}>Tell us something about whether you like listening or not(eg. artists, genre):</label>
                <textarea className='html-editor'  id="myTextarea" rows="5" cols="50"></textarea>

                <button onClick={handleFormSubmit} type="submit" className="btn btn-primary btn-block"> Next Step</button>
                
            </form>
            <Footer />
        </Container>    
       
        );
    }
}