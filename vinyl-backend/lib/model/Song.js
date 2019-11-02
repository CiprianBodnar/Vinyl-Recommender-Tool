"use strict"

module.exports = class  Song{
    constructor(name, artist, album){
        this.name = name
        this.artist = artist
        this.album = album
    }

    display(){
        return '${this.name} is a song'
    }
}