"use strict"

module.exports = class  Album{
    constructor(name, artist){
        this.name = name
        this.artist = artist
    }

    display(){
        return this.name + ' is a album'
    }
}