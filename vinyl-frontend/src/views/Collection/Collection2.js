import React, {Component} from 'react';
import NavigationLogged from '../../components/NavigationLogged'
import Footer from '../../components/Footer';
import Jumbotron from '../../components/Jumbotron';
import MusicSoundcloud from '../../components/MusicSoundcloud';
import './Collection.css';
import Arrow from '../../assets/arrow.png';



export default class Collection2 extends Component {

    constructor(props){
        super(props);
        this.state = {
            genreRec_name : localStorage.getItem('genreRec_name'),
            genreRec_url : localStorage.getItem('genreRec_uel'),
            genreRec_foll : localStorage.getItem('genreRec_foll'),
            genreRec_genre : localStorage.getItem('genreRec_genre'),
            genreRec_image : localStorage.getItem('genreRec_image'),
            artistRec_name : localStorage.getItem('artistRec_name'),
            artistRec_url : localStorage.getItem('artistRec_uel'),
            artistRec_foll : localStorage.getItem('artistRec_foll'),
            artistRec_genre : localStorage.getItem('artistRec_genre'),
            artistRec_image : localStorage.getItem('artistRec_image'),

        };
    }

    render(){

        // async function getGenreSparql(){

        //     var idUser = localStorage.getItem('id_user');
        //     var url = 'http://localhost:8000/api/sparql/genre/spotify?id=';
        //     url = url + idUser;
      
        //     let req = new Request(url, {
        //       method: 'GET',
        //       mode: 'cors',
        //     });
        //       fetch(req)
        //       .then((response) => {
        //       if(response.ok){
        //           return response.json();
        //       }
        //       else{
        //           throw new Error('BAD HTTP stuff')
        //       }
        //       })
        //       .then((jsonData) => {
      
        //       var genreRec = []
        //       if(jsonData.hasOwnProperty('name')){
        //         genreRec.push(jsonData.name); //0
        //         }
        //       else{
        //           genreRec.push('no in spotify');
        //       }
      
        //       if(jsonData.hasOwnProperty('external_urls')){
        //         genreRec.push(jsonData.external_urls.spotify); //1
        //       }
        //       else{
        //         genreRec.push('https://www.spotify.com/ro/');
        //       }
        //       if(jsonData.hasOwnProperty('followers')){
        //         genreRec.push(jsonData.followers.total); //2
        //       }
        //       else{
        //         genreRec.push(0);
        //       }
        
        //       if(jsonData.hasOwnProperty('genres')){
        //         genreRec.push(jsonData.genres[0]); //3
        //       }
        //       else{
        //         genreRec.push('no in spotify');
        //       }
      
        //       if(jsonData.hasOwnProperty('images')){  
        //         genreRec.push(jsonData.images[0].url); //4
        //       }
        //       else{
        //         genreRec.push('/../../assets/photo.jpg');
        //       }
      
        //       localStorage.removeItem('genreRecc');
        //       localStorage.setItem("genreRecc", JSON.stringify(genreRec)); //5
        //   })
        //   .catch((err) => {
        //       console.log('ERROR', err.message);
        //   });  
      
        //   var response = JSON.parse(localStorage.getItem("genreRecc"));
        //   console.log("dupa gen:" + response);
        //   }
      
        async function getGenreSparql(){

            var idUser = localStorage.getItem('id_user');
            var url = 'http://localhost:8000/api/sparql/genre/spotify?id=';
            url = url + idUser;
      
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
      
                localStorage.clear('genreRec_name');
                localStorage.clear('genreRec_genre');
                localStorage.clear('genreRec_url');
                localStorage.clear('genreRec_foll');
                localStorage.clear('genreRec_image');

              if(jsonData.hasOwnProperty('name')){
               var genreRec_name =  jsonData.name; 
                }
              else{
                var genreRec_name = 'No find on spotify.';
              }
              localStorage.setItem('genreRec_name', genreRec_name);
      
              if(jsonData.hasOwnProperty('external_urls')){
                var genreRec_url = jsonData.external_urls.spotify; 
              }
              else{
                var genreRec_url = 'https://www.spotify.com/ro/';
              }
              localStorage.setItem('genreRec_url', genreRec_url);


              if(jsonData.hasOwnProperty('followers')){
                var genreRec_foll = jsonData.followers.total; 
              }
              else{
                var genreRec_foll = 'no in spotify';
              }
              localStorage.setItem('genreRec_foll', genreRec_foll);
        
              if(jsonData.hasOwnProperty('genres')){
                var genreRec_genre = jsonData.genres[0]; 
              }
              else{
                var genreRec_genre = 'no in spotify';
              }
              localStorage.setItem('genreRec_genre', genreRec_genre);
      
              if(jsonData.hasOwnProperty('images')){  
                var genreRec_image = jsonData.images[0].url; 
              }
              else{
                var genreRec_image = '/../../assets/photo.jpg';
              }
              localStorage.setItem('genreRec_image', genreRec_image);
      
          })
          .catch((err) => {
              console.log('ERROR', err.message);
          });  
          }
      
        async function getArtistSparql(){

            var idUser = localStorage.getItem('id_user');
            var url = 'http://localhost:8000/api/sparql/artist/spotify?id=';
            url = url + idUser;
      
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
      
             localStorage.clear('artistRec_name');
             localStorage.clear('artistRec_genre');
             localStorage.clear('artistRec_url');
             localStorage.clear('artistRec_foll');
             localStorage.clear('artistRec_image');


              if(jsonData.hasOwnProperty('name')){
              var artistRec_name = jsonData.name; //0
              }
              else{
                var artistRec_name = 'No find on spotify.';
              }
              localStorage.setItem('artistRec_name', artistRec_name);
      
              if(jsonData.hasOwnProperty('external_urls')){
                var artistRec_url = jsonData.external_urls.spotify; 
              }
              else{
                var artistRec_url = 'https://www.spotify.com/ro/';
              }
              localStorage.setItem('artistRec_url',artistRec_url);
      
              if(jsonData.hasOwnProperty('followers')){
                var artistRec_foll = jsonData.followers.total; 
              }
              else{
                var artistRec_foll = 'No find on spotify.';
              }
              localStorage.setItem('artistRec_foll', artistRec_foll);
        
              if(jsonData.hasOwnProperty('genres')){
               var artistRec_genre = jsonData.genres[0]; 
              }
              else{
                var artistRec_genre = 'No find on spotify.';
              }
              localStorage.setItem('artistRec_genre', artistRec_genre);
      
              if(jsonData.hasOwnProperty('images')){  
                var artistRec_image = jsonData.images[0].url; 
              }
              else{
                var artistRec_image  =  '/../../assets/photo.jpg';
              }
              localStorage.setItem('artistRec_image', artistRec_image);
      
              })
              .catch((err) => {
                  console.log('ERROR', err.message);
              });  
          }

          const handleFormSubmit = (event) =>  {
            event.preventDefault()
            getGenreSparql();
            // getArtistSparql();
            window.location.replace("http://localhost:3000/profile/collection");

        }
          
    return (
            <div className="back">
            <NavigationLogged /> 
            <Jumbotron/>
            <br/>
            <MusicSoundcloud/>

            <br/><br/>
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card text-center shadow">
                            <div className="overflow">
                                <img  src={this.state.genreRec_image} className='card-img-top'></img>
                            </div>
                            <div className="card-body text-dark">
                                <h4 className="card-title">{this.state.genreRec_name}</h4>
                                <p className="card-text text-secondary">Genre: {this.state.genreRec_genre} </p>
                                <p className="card-text text-secondary">Followers on spotify: {this.state.genreRec_foll}</p>
                                <a className="spoty-button"  href={this.state.genreRec_url} className="btn btn-outline-success">Go to Spotify</a>
                            </div>
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="card text-center shadow">
                            <div className="overflow">
                                 <img  alt={this.state.artistRec_name} src={this.state.artistRec_image} className='card-img-top'></img> 
                            </div>
                            <div className="card-body text-dark">
                                <h4 className="card-title">{this.state.artistRec_name}</h4>
                                <p className="card-text text-secondary">Genre: {this.state.artistRec_genre} </p>
                                <p className="card-text text-secondary">Followers on spotify: {this.state.artistRec_foll}</p>
                                <a className="spoty-button" href={this.state.artistRec_url} className="btn btn-outline-success">Go to Spotify</a>
                            </div>
                        </div>
                     </div> 
                </div>

            </div>
            <p className="arrow-next"><strong>Next recomandations:</strong> <a onClick={handleFormSubmit} type="submit" >
                <img alt="Arrow" src={Arrow} width="100" height="100"></img>
            </a>
            </p>
            <Footer />
        </div>
    );
    }
}
