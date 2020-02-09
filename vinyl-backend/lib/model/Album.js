
const mongoose = require('mongoose')

const AlbumSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    user_id:{
        type: String,
        require: true
    },
    songs: {
        type: [Map]
    }
});

AlbumSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      title: this.title,
      songs: this.songs
    };
  };

module.exports = mongoose.model('Albums', AlbumSchema);