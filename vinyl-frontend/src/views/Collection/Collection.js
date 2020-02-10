import React, {Component} from 'react';
import NavigationLogged from '../../components/NavigationLogged'
import Footer from '../../components/Footer';
import Jumbotron from '../../components/Jumbotron';
import MusicSoundcloud from '../../components/MusicSoundcloud';
import './Collection.css';


export default class Collection extends Component {

    constructor(props){
        super(props);
        this.state = {
            storedNames : JSON.parse(localStorage.getItem("names")),
            storedUrls : JSON.parse(localStorage.getItem("urls_spotify")),
            storedFollowers : JSON.parse(localStorage.getItem("followers")),
            storedGenres : JSON.parse(localStorage.getItem("genres")),
            storedImages : JSON.parse(localStorage.getItem("images"))
        };
    }

    render(){

    return (
            <div>
            <NavigationLogged /> 
            <Jumbotron/>
            <br/>
            {/* <MusicSoundcloud/> */}

            <br/><br/>
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                {this.state.storedNames.map ((name,index) => {
                    return <div className="col-md-4" key={index}>
                        <div className="card text-center shadow">
                            <div className="overflow">
                                <img  alt={name} src={this.state.storedImages[index]} className='card-img-top'></img>
                            </div>
                            <div className="card-body text-dark">
                                <h4 className="card-title">{name}</h4>
                                <p className="card-text text-secondary">Genre: {this.state.storedGenres[index]} </p>
                                <p className="card-text text-secondary">Followers on spotify: {this.state.storedFollowers[index]}</p>
                                <a href={this.state.storedUrls[index]} className="btn btn-outline-success">Go to Spotify</a>
                            </div>
                        </div>
                    </div>

                })}
                </div>
            </div>
            <Footer />
        </div>
    );
    }
}
