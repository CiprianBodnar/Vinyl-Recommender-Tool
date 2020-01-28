async function getToken(email, pass){
    try{
        fetch('http://localhost:8000/api/users/register', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
            "user":{
                'email': email,
                'password': pass
            
                }
            })
        })
        .then((response) => {return response.json(); })
        .then((myJson) => {
            // console.log(myJson.user.token);
            return myJson.user.token;
        });
        // .then(response)

        // var content = await response.json();
        // console.log(content.user.token);
        // return await content.user.token;
        // return content.user.token;
    }
    catch(err){
        console.log(err);
        return 0;
    }
}