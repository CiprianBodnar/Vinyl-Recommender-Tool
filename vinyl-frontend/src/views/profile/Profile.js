import React, {Component} from 'react';
import NavigationLogged from '../../components/NavigationLogged'
import Footer from '../../components/Footer';
import Jumbotron from '../../components/Jumbotron';
import MusicSoundcloud from '../../components/MusicSoundcloud';
import Background from '../../assets/vinyl3.jpg'

export default class Profile extends Component {

  render(){
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

        
        if(jsonData.hasOwnProperty('name')){
         var genreRec_name =  jsonData.name; 
          }
        else{
          var genreRec_name = 'no in spotify';
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
          var genreRec_image =  '/../../assets/photo.jpg';
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
      getArtistSparql();
      window.location.replace("http://localhost:3000/profile/collection");
  }

    return (
          <div className="back" style={{backgroundColor: '#00000054'}}>
          <NavigationLogged /> 
          <Jumbotron/>
          <br/>
          <MusicSoundcloud/>
          <br/><br/>
          <div className="container">
              <div className="card card-image" style={{backgroundImage: "url("+Background+")"}}>
              
                    <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                          <div>
                                <h5 className="pink-text"><i className="fas fa-chart-pie"></i> </h5>
                                <h3 className="card-title pt-2" style={{alignText:'right'}}><strong></strong></h3>
                                <br/><br/><br/><br/><br/><br/><br/><br/>
                          </div>
                    </div>
                    <button onClick={handleFormSubmit} type="submit" className="btn btn-primary btn-block"><strong>Let's see your recommandation!</strong></button>
              </div>   
          </div>
          <br/>
          <Footer />
      </div>
    );
  }
}

