import React from 'react';
import NavigationHome from '../../components/NavigationHome'
import { Container} from 'react-bootstrap';
import Footer from '../../components/Footer';
import './About.css';

export const About = () => {

  return (
    <Container>
        <NavigationHome /> 
        <Footer />
    </Container>
      
  )
}

export default About ;