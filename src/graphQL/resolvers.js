const { addArtist } = require("./Controllers/Artist");
const { addAlbum } = require("./Controllers/Album");
const { getSong, addSong } = require("./Controllers/Song");
const resolvers = {
  Query: {
    getSong
  },
  Mutation: {
    addArtist,
    addAlbum,
    addSong
  }
};

module.exports = resolvers;
