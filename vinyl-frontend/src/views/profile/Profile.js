import React from 'react';
import NavigationLogged from '../../components/NavigationLogged'
import { Container} from 'react-bootstrap';
import Footer from '../../components/Footer';
import './Profile.css';

export const Profile = () => {

  return (
    <Container>
        <NavigationLogged /> 

        <Footer />
    </Container>
      
  )
}

export default Profile ;