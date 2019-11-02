"use strict"

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
