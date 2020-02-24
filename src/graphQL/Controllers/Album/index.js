const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server");

const addAlbum = async (parent, args, context, info) => {
  try {
    const { albumData } = args;
    const albumModel = mongoose.model("album");
    const newAlbum = await albumModel.create(albumData);
    albumData.artists.forEach(artistId => {
      mongoose.model("artist").findById(artistId, function(err, doc) {
        doc.albums.push(newAlbum);
        doc.save();
      });
    });
    return newAlbum;
  } catch (error) {
    throw new UserInputError("Error while creating album", {
      invalidArgs: Object.keys(args)
    });
  }
};

module.exports = {
  addAlbum
};
