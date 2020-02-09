import React, {Component} from 'react';
import NavigationLogged from '../../components/NavigationLogged'
import Footer from '../../components/Footer';
import Jumbotron from '../../components/Jumbotron';
import MusicSoundcloud from '../../components/MusicSoundcloud';
import Background from '../../assets/vinyl3.jpg'

export default class Profile extends Component {

  render(){

    async function getGenreSparql(){

      const url = 'http://localhost:8000/api/sparql/genre/spotify';
      var idUser = localStorage.getItem('id_user');
      let req = new Request(url, {
        method: 'GET',
        mode: 'cors',
        params: {id: idUser}
      });

      fetch(req)
        .then((response) => {
          if(response.ok){
            // console.log('eeeee');
            return response.json();
          }
          else{
            console.log('error');
            throw new Error('BAD HTTP stuff');
          }
        })
        .then((jsonData) => {
          console.log('gwegwegw');
          console.log(jsonData);
          })
        .catch((err) => {
            console.log('ERROR', err.message);
        });   
        console.log('efwefewfwe');           
      }
     
              // for(const prop2 in subData){
                      // var item = subData[prop2];
      
                      // console.log(item);

                      // console.log(jsonData.name);

                      // console.log(item.external_urls.spotify);
                      // console.log(item.followers.total);
                      // console.log(item.genres[0]);
                      // console.log(item.images[0].url);


                      // if(item.name === false){
                              // names.push(item.name);
                              // urls_spotify.push(item.external_urls.spotify);
                              // followers.push(item.followers.total);
                              // genres.push(item.genres[0]);
                              // images.push(item.images[0].url);
                        // localStorage.setItem("names", jsonData.name);
                        // localStorage.setItem("urls_spotify",item.external_urls.spotify);
                        // localStorage.setItem("followers", item.followers.total);
                        // localStorage.setItem("genres", item.genres[0]);
                        // localStorage.setItem("images",item.images[0].url);
                      // }

      

    const handleFormSubmit = (event) =>  {

      event.preventDefault()
      // var stoName = localStorage.JSON.parse(localStorage.getItem("names"));
      // while(!stoName){
      //   getSparql();
      //   stoName = localStorage.JSON.parse(localStorage.getItem("names"))
      // }
      // var album = localStorage.getItem('names');
      // while( album === null){
          getGenreSparql();
      
      // getSparql();
      // window.location.replace("http://localhost:3000/profile/collection");
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

