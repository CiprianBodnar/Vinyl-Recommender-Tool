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
        // headers: {
        //   "Content-Type": "application/json"
        // },
        mode: 'cors',
        // params: {id: idUser}
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

        var genreRec = []
        console.log(jsonData.name);
        genreRec.push(jsonData.name); //0

          if(jsonData.hasOwnProperty('external_urls')){
          genreRec.push(jsonData.external_urls.spotify); //1
        }
        else{
          genreRec.push(0);
        }
        if(jsonData.hasOwnProperty('followers')){
          genreRec.push(jsonData.followers.total); //2
        }
        else{
          genreRec.push(0);
        }
  
        if(jsonData.hasOwnProperty('genres')){
          genreRec.push(jsonData.genres[0]); //3
        }
        else{
          genreRec.push(0);
        }

        if(jsonData.hasOwnProperty('images')){  
          genreRec.push(jsonData.images[0].url); //4
        }
        else{
          genreRec.push(0);
        }

        localStorage.removeItem('genreRecc');
        localStorage.setItem("genreRecc", JSON.stringify(genreRec));
    })
    .catch((err) => {
        console.log('ERROR', err.message);
    });  

    var response = JSON.parse(localStorage.getItem("genreRecc"));
    console.log("egwegwegwegw" + response);
    }

    // async function getArtistSparql(){

    //   var idUser = localStorage.getItem('id_user');
    //   var url = 'http://localhost:8000/api/sparql/artist/spotify?id=';
    //   url = url + idUser;

    //   let req = new Request(url, {
    //     method: 'GET',
    //     mode: 'cors',
    //   });
    //     fetch(req)
    //     .then((response) => {
    //     if(response.ok){
    //         return response.json();
    //     }
    //     else{
    //         throw new Error('BAD HTTP stuff')
    //     }
    //     })
    //     .then((jsonData) => {

    //     console.log(jsonData);
    //     })
    //     .catch((err) => {
    //         console.log('ERROR', err.message);
    //     });  
    //   }
  

    const handleFormSubmit = (event) =>  {

      event.preventDefault()
      
      //   stoName = localStorage.JSON.parse(localStorage.getItem("names"))

      getGenreSparql();
      // getArtistSparql();
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

