
class Spotify_service {


    searchOptions(accesToken){
      var obj = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accesToken
        },
        mode: 'cors',
        cache: 'default'
    }
    return obj;
  }
    
    authOptionsFunction(my_code, client_id, client_secret, redirect_uri) {
        var obj = {
          url: 'https://accounts.spotify.com/api/token/',
          form: {
              code: my_code,
              redirect_uri: redirect_uri,
              grant_type: 'authorization_code'
          },
          headers: {
              'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
          json: true
        }
      return obj
      }

      refresh(refresh_token, client_id, client_secret){
        var obj = {
        url: 'https://accounts.spotify.com/api/token/',
          headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
          form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
          },
          json: true
        }
        return obj
    }
}

module.exports = Spotify_service