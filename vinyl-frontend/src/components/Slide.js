import React, {Component} from 'react';
import { Slide } from 'react-slideshow-image';

export default class Slideshow extends Component{


    render (){
        const slideImages = [
            'images/slide_2.jpg',
            'images/slide_3.jpg',
          ];
           
          const properties = {
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
            indicators: true,
            arrows: true,
            onChange: (oldIndex, newIndex) => {
              console.log(`slide transition from ${oldIndex} to ${newIndex}`);
            }
        }

        return(

      <div className="slide-container">
        <Slide {...properties}>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>Slide 1</span>
            </div>
          </div>

          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>Slide 2</span>
            </div>
          </div>
        </Slide>
      </div>
    );
}
}

