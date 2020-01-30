import React, {Component} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

export default class Footer extends Component{
    render(){
        const footerS={
            textAlign: 'center',
        };

        return(
            <footer style={footerS}>
            <MDBFooter color="blue" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">Footer Content</h5>
                        <p>
                        Thank you for accessing our website. We are waiting for you!
                        </p>
                    </MDBCol>
                    <MDBCol md="6">
                        <h5 className="title">Links</h5>
                        <ul>
                        <li className="list-unstyled">
                            <a href="#!">Github repository</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Faculty of computer science</a>
                        </li>
                        </ul>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://localhost:3000/"> Vinyl-Recommandation </a>
                    </MDBContainer>
                </div>
    </MDBFooter>
    </footer>
        )
    }
}
