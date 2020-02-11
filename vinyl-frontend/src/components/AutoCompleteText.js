import React from 'react';
import './AutoCompleteText.css';

export default class AutoCompleteText extends React.Component{
    constructor (props) {
        super(props);
       
        this.state={
            suggestions: [],
            text : '',
        };
    }

    onTextChanged = (e) => {
        const{items} = this.props;
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0) {
            const regex = new RegExp(`^${value}`,'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }
            this.setState(() => ({suggestions,text:value}));
            //console.log("value",value);
    }

    suggestionSelected(value){
        this.setState(() => ({
            text: value,
            suggestions: [],

        }))
    }
    
    handleSubmit =(e) => {
        alert("your search is: ")
    }

    renderSuggestions (){
        const{suggestions}=this.state;
        if(suggestions.length ===0){
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={()=>this.suggestionSelected(item)}>{item}</li>)} 
            </ul>
        );
    }

    string() {
        {

           var artist_array=[];
           var genre_array=[];
           var album_array=[];
           var song_array=[];
           
           const text_input = "I like Jazz music and Rock music. My favorite song is Take Five and Free Bird. I always prefer Classic music, especially Opera music by Luciano Pavarotti or Giuseppe Verdi and performed by Angela Gheorghiu; I like Metal albums; I always dislike Rap music; I hate songs produced by Andrea Bocelli";
        //    const text_input = this.state.text;
           var natural = require('natural');
           var tokenizer = new natural.WordTokenizer();
           var words = tokenizer.tokenize(text_input);

           console.log("words.length  ",words.length)
    
           if(text_input.length>2){
            for (let i in words){
               i=parseInt(i, 10);
    
               if(words[i].includes("music")&& !words[i-2].includes("dislike")){genre_array.push(words[i-1])}
    
               if((words[i].includes("by")&& !words[i-3].includes("hate"))|| ((words[i].includes("or") || words[i].includes("and"))&& words[i-3].includes("by"))){artist_array.push(words[i+1]+ ' ' + words[i+2])}
    
               if((words[i].includes("is") && words[i-1].includes("song")) || ((words[i].includes("or") || words[i].includes("and"))&& words[i-3].includes("is"))){song_array.push(words[i+1]+' '+words[i+2])}
              
               if(words[i].includes("album")&& !words[i-2].includes("dislike")){album_array.push(words[i-1])};
    
           }
    
           console.log("search genres: ",genre_array);
           console.log("search artists: ",artist_array);

        //    localStorage.clear('artistsPref');
        //    localStorage.clear('genrePref');
        //    localStorage.clear('album_array');
        //    localStorage.clear('song_array');

           localStorage.setItem('artistsPref', JSON.stringify(artist_array));
           localStorage.setItem('genrePref', JSON.stringify(genre_array));
           localStorage.setItem('album_array', JSON.stringify(album_array));
           localStorage.setItem('song_array', JSON.stringify(song_array));



           console.log("search songs: ",song_array);
           console.log("search albums: ",album_array);
    
           console.log("text",text_input);  
           console.log("tokenizare",words);
           
        }
        }
    }

    

    render (){

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
                                "answer": " "
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

            event.preventDefault();

            var artistsPref = JSON.parse(localStorage.getItem('artistsPref'));
            var genrePref = JSON.parse(localStorage.getItem('genrePref'));;

            console.log(artistsPref);
            console.log(genrePref);


            getPreferences(artistsPref, genrePref);
            loginSpotify();
            window.location.replace("http://localhost:8000/api/sparql/login");
        }

        const{text}=this.state;
        return(
            <div className="App"> 
            <button className="btn btn--loginApp-link" onClick={() => {this.string()}}>
            Search
                  </button>
                 
            
           <div className="AutoCompleteText">
              
               <input value={text} placeholder="Type your favorite genre, artist, song..." onChange={this.onTextChanged} type="text" />
               {this.renderSuggestions()}

           </div>
            <button onClick={handleFormSubmit} type="submit" className="btn btn-primary btn-block"> Next Step</button>
 
           </div>
        );
    }
}