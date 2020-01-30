import React from 'react';
import NavigationHome from '../../components/NavigationHome'
import { Container} from 'react-bootstrap';
import Footer from '../../components/Footer';
import Background from '../../assets/vinyl-wall.jpg'

export const About = () => {

  return (
    <Container>
        <NavigationHome /> 
        <br/><br/><br/>
        <div className="container">

            <div className="card card-image" style={{backgroundImage: "url("+Background+")"}}>

                <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                  <div>
                    <h3 className="pink-text"><i class="fas fa-chart-pie"></i>Welcome! </h3>
                    <br/><br/><br/>
                    <h5 className="card-title pt-2" style={{alignText:'right'}}>We are Andrada-Ionela Tapuc, Ciprian Bodnar and Cosmin Pintilie and we are a team of students from the computer science faculty in Iasi.</h5>
                    <br/><br/><br/><br/><br/>
                    <h3 className="pink-text"><i class="fas fa-chart-pie"></i>Thank you for your support! </h3>
                  </div>
                </div>

            </div>
              
        </div>
        <br/><br/>
        <Footer />
    </Container>
      
  )
}

export default About ;