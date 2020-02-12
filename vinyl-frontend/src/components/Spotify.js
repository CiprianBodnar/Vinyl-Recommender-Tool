import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import logo from "./logo.png";
import "./App.css";

const spotifyApi = new SpotifyWebApi();

export default class Spotify extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
   
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: '', albumArt: '',id: '',artist_id: '',artist_name: ''},
      topArtists : [ {name : '',genres: '', images: 'none', urll: '',external_urls: ''} ],
      searchSong : [ {name : '',genres: '', images: 'none', urll: '',external_urls: ''} ]
    };
  
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        if(response.item.name){
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url,
              urll: response.item.external_urls.spotify,
              id: response.item.id,
              artist_id: response.item.artists[0].id,
              artist_name: response.item.artists[0].name
            }
        });
      } else {
            }
      })
  }

getTopArtist(){
  spotifyApi.getMyTopArtists()
    .then((response) => {
      this.state.topArtists = response.items;
      console.log(this.state.topArtists)

      for (var i in response.items) {
        console.log(this.state.topArtists[i].name,response.items[i].genres[0],response.items[i].images[0].url,response.items[i].external_urls.spotify,response.items[i].id);
      }
    })
}
// Search tracks whose name, album or artist contains 'Love'

getSearchTrack(){
  var artistId = '0qeei9KQnptjwb8MgkqEoy';

  spotifyApi.getArtistRelatedArtists(artistId).then(
    function(data) {
      if (data.body.artists.length) {
        // Print the number of similar artists
        console.log('I got ' + data.items.artists.length + ' similar artists!');
  
        console.log('The most similar one is ' + data.body.artists[0].name);
      } else {
        console.log("I didn't find any similar artists.. Sorry.");
      }
    },
    function(err) {
      console.log('Something went wrong..', err.message);
    }
  );
}

render() {
    return (
      <div className="App">
      
        <div className="App">       
          <a href ={this.state.nowPlaying.urll} className="link" >Now Playing on Spotify: { this.state.nowPlaying.artist_name +'-' + this.state.nowPlaying.name }</a>
        </div>
        

        <div className="App">
          <img src={this.state.nowPlaying.albumArt } style={{ height: 300 }}/>
          <iframe src = {"https://open.spotify.com/embed/artist/"+this.state.nowPlaying.artist_id} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>

        { this.state.loggedIn && this.getNowPlaying()}
        

        <div></div>

        { this.state.loggedIn &&
          <button className="btn btn--loginApp-link" onClick={() => {this.getTopArtist();this.getNowPlaying();this.getNowPlaying()}}>
           Show your favorite artists and genres
          </button>
        }
        
        
        <div></div>
        
        <table>
        <tbody>
          {this.state.topArtists.map(function(item, key) {
             return (
                  <tr key = {key}>
                    <div class="image">
                    <img src={logo} className="App-logo" alt="logo" /> 
                    <h2 ><a href = {item.external_urls.spotify } className="link"  ><td>{item.name}</td><td><td></td>{item.genres[0]}</td></a></h2>
                    <iframe src = {"https://open.spotify.com/embed/artist/"+item.id} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>                   
                  </tr>
             )        
             })
             }
             <div>  
            </div>         
            </tbody>
       </table>


      </div>
    );
  }

}
