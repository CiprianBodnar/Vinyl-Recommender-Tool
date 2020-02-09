const mongoose = require('mongoose');
const Album = mongoose.model('Albums')

class Album_service {

    constructor() {
      }
    
        
    save(album) {
        
        var finalAlbum = new Album(album)
        
        finalAlbum.save()
    }

   
}

module.exports = Album_service