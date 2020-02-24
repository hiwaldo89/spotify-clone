const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server");
const { removeAlbum } = require("../Album");

const getArtist = async (parent, args, context, info) => {
  try {
    const { artistId } = args;
    const artist = await mongoose.model("artist").findById(artistId);
    return artist;
  } catch (error) {
    throw new UserInputError("Error while retrieving artist", {
      invalidArgs: Object.keys(args)
    });
  }
};

const addArtist = async (parent, args, context, info) => {
  try {
    const { artistData } = args;
    const artistModel = mongoose.model("artist");
    const newArtist = await artistModel.create(artistData);
    return newArtist;
  } catch (error) {
    throw new UserInputError("Error registering Artist", {
      invalidArgs: Object.keys(args)
    });
  }
};

const removeArtist = async (parent, args, context, info) => {
  try {
    const { artistId } = args;
    const deletedArtist = await mongoose
      .model("artist")
      .findByIdAndDelete(artistId);
    deletedArtist.albums.forEach(albumId => {
      mongoose.model("album").findById(albumId, function(err, doc) {
        if (doc.artists.length > 1) {
          doc.artists.pull({ _id: artistId });
          doc.save();
        } else {
          doc.remove();
        }
      });
    });
    return deletedArtist;
  } catch (error) {
    throw new UserInputError("Error while deleting artist", {
      invalidArgs: Object.keys(args)
    });
  }
};

module.exports = {
  getArtist,
  addArtist,
  removeArtist
};
