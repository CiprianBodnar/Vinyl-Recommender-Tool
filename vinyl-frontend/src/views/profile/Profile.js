import React from 'react';
import NavigationLogged from '../../components/NavigationLogged'
import Footer from '../../components/Footer';
import Jumbotron from '../../components/Jumbotron';
import CarouselLeaf from '../../components/CarouselLeaf'
import './Profile.css';

export const Profile = () => {

  return (
        <div>
        <NavigationLogged /> 
        <Jumbotron/>
        <CarouselLeaf/>
        <div className="container">
          <h2>Welcome</h2>
          
          <p>Web application able to "intelligently" recommend – by exposing a SPARQL endpoint – vinyl music records according to various criteria: user preferences (specified via controlled natural language constructs such as "I always like/love/prefer classical music, especially opera music by Rossini or Verdi and performed by Angela Gheorghiu or Juan Diego Flórez; I sometimes like progressive rock and post-rock; I like only metal albums released before 2000; I always dislike/hate rap and hip-hop; I dislike songs produced by Flood in the last 25 years"), past song purchases on various music stores, playlists – available online via music streaming services Spotify and alternatives – and/or locally (i.e. uploading a JSPF/XSPF document).</p>
          <p> The playlists could be created by the user or shared by her/his virtual "friends" (consider at least one social network). The system will use several music-related knowledge models (e.g., Music Ontology or MusicRecording concept from schema.org) and available public resources: Free Music Archive, MusicBrainz, Musicmoz Music Styles. Bonus: using Solid principles & tools. Inspiration: Musicmap.</p>
        </div>
        <Footer />
    </div>
      
  )
}

export default Profile ;