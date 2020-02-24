const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server");

const getAlbum = async (parent, args, context, info) => {
  try {
    const { albumId } = args;
    const album = await mongoose.model("album").findById(albumId);
    return album;
  } catch (error) {
    throw new UserInputError("Error while retrieving album", {
      invalidArgs: Object.keys(args)
    });
  }
};

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

const removeAlbum = async (parent, args, context, info) => {
  try {
    const { albumId } = args;
    const deletedAlbum = await mongoose
      .model("album")
      .findByIdAndDelete(albumId);
    deletedAlbum.songs.forEach(songId => {
      mongoose.model("song").findById(songId, function(err, doc) {
        if (doc.album.length > 1) {
          doc.album.pull({ _id: albumId });
          doc.save();
        } else {
          doc.remove();
        }
      });
    });
    deletedAlbum.artists.forEach(artistId => {
      mongoose.model("artist").findById(artistId, function(err, doc) {
        doc.albums.pull({ _id: albumId });
        doc.save();
      });
    });
    return deletedAlbum;
  } catch (error) {
    throw new UserInputError("Error while deleting album", {
      invalidArgs: Object.keys(args)
    });
  }
};

module.exports = {
  getAlbum,
  addAlbum,
  removeAlbum
};
