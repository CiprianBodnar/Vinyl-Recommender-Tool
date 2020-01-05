
module.exports = function authOptionsFunction(my_code, client_id, client_secret, redirect_uri) {
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

