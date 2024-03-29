import React from 'react';
import { Row, Col} from 'react-bootstrap';
import NavigationHome from '../../components/NavigationHome'
import Footer from '../../components/Footer';
import Jumbotron from '../../components/Jumbotron';
import SignIn from '../../components/SignIn';
import '../../components/Jumbotron.css';


export const Home = () => {
  return (
    
    <div className="back" style={{backgroundColor: '#00000054'}}>
        <NavigationHome /> 
        <Jumbotron />
        
          <div className="container">
          <Row >
            <Col sm={6}>
            <div className="vinyl-wrapper">
                <div className="vinyl"></div>
                <div className="record-sleeve"></div> 
                <p>Vinyl-Recommander-Tool</p>
            </div>
            <br></br>
            <br></br>
            <h3>Welcome to our Vinyl recommander tool!</h3>
            <p>You must log in/register to receive music recommendation.</p>
            </Col> 
            <Col sm={3}>
                <SignIn />
            </Col>
          </Row>
        </div>
        <Footer />
    </div>
      
  )
}

export default Home ;