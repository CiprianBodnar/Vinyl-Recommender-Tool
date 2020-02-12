import React, {Component} from 'react';
import NavigationLogged from '../../components/NavigationLogged'
import Footer from '../../components/Footer';
import Jumbotron from '../../components/Jumbotron';
import MusicSoundcloud from '../../components/MusicSoundcloud';
import Spotify from '../../components/Spotify';
import Background from '../../assets/vinyl3.jpg'
import { Container } from 'react-bootstrap';
import Arrow from '../../assets/arrow.png';


export default class Profile extends Component {

  constructor(props){
    super(props);
        this.state = {
          initialStateSearch: "Search details for an artist...",
          currentArtist: '',
          wikiA: '',
          nameA: '',
          birthNameA: '',
          birthPlaceA: '',
          activityStartA: '',
          genreRec_name : 'By preferred genres',
          genreRec_url : '',
          genreRec_foll : '',
          genRec_id : '',
          genreRec_genre : '',
          genreRec_image : 'https://images.freeimages.com/images/large-previews/b32/vinyl-dream-1253154.jpg',
          artistRec_name : 'By favorite artists',
          artistRec_url : '',
          artistRec_foll : '',
          artistRec_id : '',
          artistRec_genre : '',
          artistRec_image : 'https://images.freeimages.com/images/large-previews/506/my-turntable-2-1424358.jpg',
          artistsPref : JSON.parse(localStorage.getItem('artistsPref')),
          genrePref : JSON.parse(localStorage.getItem('genrePref')),
          album_array : JSON.parse(localStorage.getItem('album_array')),
          song_array : JSON.parse(localStorage.getItem('song_array'))
  };
  }
  changeArtist(newArtist){
    this.setState({currentArtist : newArtist});
  }


  getSearchArtist = async (artistName) => {

    var url = 'http://localhost:8000/api/sparql/artist/details?artistName=';
    // artistName = localStorage.getItem('artistSearch');
    url = url + artistName;

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
        console.log(jsonData[0].wikidataArtist.value);
        console.log(jsonData[0].artistName.value);
        console.log(jsonData[0].artistBirthName.value);
        console.log(jsonData[0].artistBirthName.value);
        console.log(jsonData[0].artistActivityStartYear.value);

      this.setState({
        wikiA : jsonData[0].wikidataArtist.value,
        nameA : jsonData[0].artistName.value,
        birthNameA : jsonData[0].artistBirthName.value,
        birthPlaceA : jsonData[0].artistBirthName.value,
        activityStartA : jsonData[0].artistActivityStartYear.value
      });

  })
  .catch((err) => {
      console.log('ERROR', err.message);
  });  
}


  getGenreSparql = async () => {

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

      console.log("dupa gen: " + jsonData);
      if(jsonData.hasOwnProperty('name')){
        var vargenreRec_name =  jsonData.name; 
        }
      else{
        var vargenreRec_name = 'Unavailable on spotify, just on dbpedia.';
      }

      if(jsonData.hasOwnProperty('id')){
        var vargenreRec_id = jsonData.id; 
      }
      else{
        var vargenreRec_id = 'Unavailable on spotify.';
      }

      if(jsonData.hasOwnProperty('external_urls')){
        var vargenreRec_url = jsonData.external_urls.spotify; 
      }
      else{
        var vargenreRec_url = 'https://www.spotify.com/ro/';
      }

      if(jsonData.hasOwnProperty('followers')){
        var vargenreRec_foll = jsonData.followers.total; 
      }
      else{
        var vargenreRec_foll = 'Unavailable on spotify.';
      }

      if(jsonData.hasOwnProperty('genres')){
        var vargenreRec_genre = jsonData.genres[0]; 
      }
      else{
        var vargenreRec_genre = 'Unavailable on spotify.';
      }

      if(jsonData.hasOwnProperty('images')){  
        var vargenreRec_image = jsonData.images[0].url; 
      }
      else{
        var vargenreRec_image = 'https://images.freeimages.com/images/large-previews/b32/vinyl-dream-1253154.jpg';
      }
      

      this.setState({
        genreRec_name : vargenreRec_name,
        genRec_id : vargenreRec_id,
        genreRec_url : vargenreRec_url,
        genreRec_foll : vargenreRec_foll,
        genreRec_genre : vargenreRec_genre,
        genreRec_image : vargenreRec_image
      });

  })
  .catch((err) => {
      console.log('ERROR', err.message);
  });  
}


getArtistSparql = async()=>{

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
    var varartistRec_name = jsonData.name; //0
    }
    else{
      var varartistRec_name = 'Unavailable on spotify, just on dbpedia.';
    }

    if(jsonData.hasOwnProperty('id')){
      var varartistRec_id = jsonData.id; //0
      }
      else{
        var varartistRec_id = 'Unavailable on spotify.';
      }

    if(jsonData.hasOwnProperty('external_urls')){
      var varartistRec_url = jsonData.external_urls.spotify; 
    }
    else{
      var varartistRec_url = 'https://www.spotify.com/ro/';
    }

    if(jsonData.hasOwnProperty('followers')){
      var varartistRec_foll = jsonData.followers.total; 
    }
    else{
      var varartistRec_foll = 'Unavailable on spotify.';
    }

    if(jsonData.hasOwnProperty('genres')){
     var varartistRec_genre = jsonData.genres[0]; 
    }
    else{
      var varartistRec_genre = 'Unavailable on spotify.';
    }

    if(jsonData.hasOwnProperty('images')){  
      var varartistRec_image = jsonData.images[0].url; 
    }
    else{
      var varartistRec_image  =  'https://images.freeimages.com/images/large-previews/506/my-turntable-2-1424358.jpg';
    }

    this.setState({
      artistRec_name : varartistRec_name,
      artistRec_url : varartistRec_url,
      artistRec_foll : varartistRec_foll,
      artistRec_id : varartistRec_id,
      artistRec_genre : varartistRec_genre,
      artistRec_image : varartistRec_image
    });

    })
    .catch((err) => {
        console.log('ERROR', err.message);
    });  
}

handleChange = (e) => {
  this.setState({
      [e.target.name]: e.target.value
  })
}

onSubmit = (e) => {
  e.preventDefault();
  const form = {
   currentArtist: this.state.currentArtist,
  }
 localStorage.setItem('artistSearch',this.state.currentArtist);
}

  render(){


    return (
          <div className="back" style={{backgroundColor: '#00000054'}}>
            <NavigationLogged /> 
            <Jumbotron/>
            <br/>
            <MusicSoundcloud/>
            <br/><br/>
            <Spotify></Spotify>
            <br/><br/>
            <Container>
                <div className="search-box">
                    <form onSubmit={this.handleSearchTermSubmit}>
                      <input name="currentArtist" type="text" value="Search an artist.." onChange={e =>this.handleChange(e)} />
                      <button type='submit'  onClick={(e) => this.onSubmit(e), this.getSearchArtist(this.state.currentArtist)}>Search</button>                     
                    </form>
                    <div >
                      <p style={{color:'black'}}><strong>Stage name:</strong> {this.state.nameA}</p>
                      <p style={{color:'black'}}><strong>Wikipedia artist link:</strong> <a href={this.state.wikiA} >{this.state.wikiA}</a></p>
                      <p style={{color:'black'}}><strong>Birth name:</strong> {this.state.birthNameA}</p>
                      <p style={{color:'black'}}><strong>Birth place:</strong> <a href={this.state.birthPlaceA}>{this.state.birthPlaceA}</a></p>
                      <p style={{color:'black'}}><strong>Year in which the career began:</strong> {this.state.activityStartA}</p>
                    </div>

                </div>
                <div className="card card-image" style={{backgroundImage: "url("+Background+")"}}>
                
                      <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                            <div>
                                  <h5 className="pink-text"><i className="fas fa-chart-pie"></i> </h5>
                                  <h3 className="card-title pt-2" style={{alignText:'right'}}><strong></strong></h3>
                                  <br/><br/><br/><br/><br/><br/><br/><br/>
                            </div>
                      </div>
                      <button onClick={() => {this.getGenreSparql(); this.getArtistSparql();}} type="submit" className="btn btn-primary btn-block"><strong>Let's see your recommandation!</strong></button>

                </div> <br/>
                <p style={{color:'black'}}>Artists: {this.state.artistsPref}</p>
                <p style={{color:'black'}}>Genres: {this.state.genrePref } </p>
                <p style={{color:'black'}}>Songs: {this.state.song_array} </p>
                <p style={{color:'black'}}>Albums: {this.state.album_array} </p>  
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
                                  <iframe src = {"https://open.spotify.com/embed/artist/"+this.state.genRec_id} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe><br/>
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
                                      <iframe src = {"https://open.spotify.com/embed/artist/"+this.state.artistRec_id} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe><br/>
                                      <a className="spoty-button" href={this.state.artistRec_url} className="btn btn-outline-success">Go to Spotify</a>
                                  </div>
                              </div>
                      </div> 
                </div>
              </Container>
            <br/>
            <Footer />
      </div>
    );
  }
}

