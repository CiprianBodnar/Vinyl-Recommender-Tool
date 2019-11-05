"use strict"
const mongoose = require('mongoose')

const AlbumSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    }
},{strict: false});

module.exports = mongoose.model('Album', AlbumSchema);