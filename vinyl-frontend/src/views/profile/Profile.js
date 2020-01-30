import React, {Component} from 'react';
import NavigationLogged from '../../components/NavigationLogged'
import Footer from '../../components/Footer';
import Jumbotron from '../../components/Jumbotron';
import MusicSoundcloud from '../../components/MusicSoundcloud';
import Background from '../../assets/vinyl3.jpg'

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
          <br/>
          {/* <MusicSoundcloud/> */}
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

