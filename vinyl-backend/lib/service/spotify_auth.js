

export default function(){

    let token = window.location.hash.substr(1);
    if(token){
        const obj = Object.fromEntries( new URLSearchParams(token));
        return obj.acces_token;
    }
};

function redirectToSpotifyAuth(){

    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const clientId = '158f2d04baf54331b490d40a5b0c2741';
    const clientSecret = '94d84b237bdd47dd83ef1114d4aaf439';

}