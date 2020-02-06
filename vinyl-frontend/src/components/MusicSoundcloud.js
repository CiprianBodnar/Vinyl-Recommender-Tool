import React, {Component} from 'react';
import './Jumbotron';


export default class MusicSoundcloud extends Component{

render(){
    return(

        <div className="music-box">
		<div className="music-box__dec"></div>
		<div className="music-box__covers">
			<iframe title="myFrame" width="33.333%" height="auto" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/129954063&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
			<iframe title="myFrame" width="33.333%" height="auto" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/266456511&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
			<iframe title="myFrame" width="33.333%" height="auto" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/226892618&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
		</div>
		<div className="music-box__dec"></div>
	</div>

    );
}
}
