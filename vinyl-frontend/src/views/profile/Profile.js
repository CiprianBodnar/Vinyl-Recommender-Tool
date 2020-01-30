import React, {Component} from 'react';
import NavigationLogged from '../../components/NavigationLogged'
import Footer from '../../components/Footer';
import Jumbotron from '../../components/Jumbotron';
// import CarouselLeaf from '../../components/CarouselLeaf'
import './Profile.css';

export default class Profile extends Component {

  render(){

    async function getSparql(){

      var getToken = localStorage.getItem('token');
      var putToken = "Token " + getToken;
      const url = 'http://localhost:8000/api/sparql';

      var idUser  = localStorage.getItem('id_user');

      var names = [];
      var urls_spotify = [];
      var followers = [];
      var genres = [];
      var images = [];

      let header = new Headers();
      header.append('Authorization', putToken);
      let req = new Request(url, {
        method: 'GET',
        headers: header,
        mode: 'cors',
        params: {id: idUser}
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
          localStorage.setItem('lenJsonSparq',jsonData.length);

          for(const prop in jsonData){
              var subData = jsonData[prop];
              console.log(subData);
              for(const prop2 in subData){
                      var item = subData[prop2];
                      console.log(item);
                      console.log(item.name);
                      console.log(item.external_urls.spotify);
                      console.log(item.followers.total);
                      console.log(item.genres[0]);
                      console.log(item.images[0].url);
                      if(names.includes(item.name) === false){
                              names.push(item.name);
                              urls_spotify.push(item.external_urls.spotify);
                              followers.push(item.followers.total);
                              genres.push(item.genres[0]);
                              images.push(item.images[0].url);
                      }
                }
          }
          localStorage.setItem("names", JSON.stringify(names));
          localStorage.setItem("urls_spotify", JSON.stringify(urls_spotify));
          localStorage.setItem("followers", JSON.stringify(followers));
          localStorage.setItem("genres", JSON.stringify(genres));
          localStorage.setItem("images", JSON.stringify( images));


        })
        .catch((err) => {
            console.log('ERROR', err.message);
        });

        // for i in jsonData:
              
      }
      

    const handleFormSubmit = (event) =>  {

      event.preventDefault()

      getSparql();

      window.location.replace("http://localhost:3000/profile/collection");
  }


    return (
          <div>
          <NavigationLogged /> 
          <Jumbotron/>
          {/* <CarouselLeaf/> */}
          <div className="container">
            <h2>Recomandation</h2>
            
            <button onClick={handleFormSubmit} type="submit" className="btn btn-primary btn-block"> See the recomandation</button>


            {/* <p>Web application able to "intelligently" recommend – by exposing a SPARQL endpoint – vinyl music records according to various criteria: user preferences (specified via controlled natural language constructs such as "I always like/love/prefer classical music, especially opera music by Rossini or Verdi and performed by Angela Gheorghiu or Juan Diego Flórez; I sometimes like progressive rock and post-rock; I like only metal albums released before 2000; I always dislike/hate rap and hip-hop; I dislike songs produced by Flood in the last 25 years"), past song purchases on various music stores, playlists – available online via music streaming services Spotify and alternatives – and/or locally (i.e. uploading a JSPF/XSPF document).</p> */}
            {/* <p> The playlists could be created by the user or shared by her/his virtual "friends" (consider at least one social network). The system will use several music-related knowledge models (e.g., Music Ontology or MusicRecording concept from schema.org) and available public resources: Free Music Archive, MusicBrainz, Musicmoz Music Styles. Bonus: using Solid principles & tools. Inspiration: Musicmap.</p> */}
          
          
          </div>

          <Footer />
      </div>
        
    );
  }
}

