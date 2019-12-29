"use strict"
const mongoose = require('mongoose')

const { Schema } = mongoose;

const SongSchema = new Schema({
    title: String,
    author: String
});

module.exports = mongoose.model('Songs', SongSchema);