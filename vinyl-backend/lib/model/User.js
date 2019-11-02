"use strict"
//https://appdividend.com/2017/12/21/simple-nodejs-authentication-system-using-passport/
module.exports = class  User{
    constructor(name, email, userRole){
        this.name = name
        this.email = email
        this.userRole = userRole
    }

    getAll(){
        return this.name + ' is a user'
    }
}
