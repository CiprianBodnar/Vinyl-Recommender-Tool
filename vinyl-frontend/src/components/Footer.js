import React, {Component} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

export default class Footer extends Component{
    render(){
        const footerS={
            textAlign: 'center',
            backgroundColor:'#343a40'
        };

        return(
            <footer style={footerS}>
             <MDBFooter color="blue" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                    <MDBCol md="6">
                        <p >
                        Thank you for accessing our website. We are waiting for you!
                        </p>
                    </MDBCol>
                    <MDBCol md="6">
                        <h5 className="title" style={{color:'black'}}>Links</h5>
                        <ul>
                            <li className="list-unstyled">
                                <a href="https://github.com/CiprianBodnar/Vinyl-Recommender-Tool">Github repository</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="http://www.uaic.ro/en/studies/faculties/faculty-computer-science/">Faculty of computer science</a>
                            </li>
                        </ul>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid style={{color:'black'}}>
                    &copy; {new Date().getFullYear()} &copy; <a style={{color:'black', textDecoration:'underline'}} href="https://localhost:3000/"> Vinyl-Recommender</a> - All Rights Reserved
                    </MDBContainer>
                </div>
    </MDBFooter> 
     </footer> 
        )
    }
}
