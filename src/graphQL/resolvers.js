const { getArtist, addArtist, removeArtist } = require("./Controllers/Artist");
const { getAlbum, addAlbum, removeAlbum } = require("./Controllers/Album");
const { getSong, addSong, removeSong } = require("./Controllers/Song");
const resolvers = {
  Query: {
    getArtist,
    getAlbum,
    getSong
  },
  Mutation: {
    addArtist,
    addAlbum,
    addSong,
    removeArtist,
    removeAlbum,
    removeSong
  }
};

module.exports = resolvers;
