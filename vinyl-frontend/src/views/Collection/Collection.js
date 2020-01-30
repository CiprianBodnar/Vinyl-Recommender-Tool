import React, {Component} from 'react';
import NavigationLogged from '../../components/NavigationLogged'
import Footer from '../../components/Footer';
import Jumbotron from '../../components/Jumbotron';
// import CarouselLeaf from '../../components/CarouselLeaf'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { ListGroupItem, CardGroup} from "react-bootstrap";
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
        {/* <CarouselLeaf/> */}
        <div className="container" >
          <h2>Collection</h2>
        <CardGroup>
          {this.state.storedNames.map ((name,index) => {
         
         return <Card style={{display: 'flex', width: '10%', height:'30%' }} key={index} >
            <Card.Img variant="top" src={this.state.storedImages[index]} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                {/* <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text> */}
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Genre: {this.state.storedGenres[index]}</ListGroupItem>
                 <ListGroupItem>Followers on spotify: {this.state.storedFollowers[index]}</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Card.Link href={this.state.storedUrls[index]}>Spotify Link</Card.Link>
            </Card.Body>
        </Card>
        })}
        </CardGroup>  
        </div>

        <Footer />
    </div>
      
  );
}
}
