const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server");

const getSong = async (parent, args, context, info) => {
  try {
    const { songId } = args;
    const song = await mongoose.model("song").findById(songId);
    return song;
  } catch (error) {
    throw new UserInputError("Error retrieving song", {
      invalidArgs: Object.keys(args)
    });
  }
};

const addSong = async (parent, args, context, info) => {
  try {
    const { songData } = args;
    const songModel = mongoose.model("song");
    const newSong = await songModel.create(songData);
    songData.album.forEach(albumId => {
      mongoose.model("album").findById(albumId, function(err, doc) {
        doc.songs.push(newSong);
        doc.save();
      });
    });
    return newSong;
  } catch (error) {
    throw new UserInputError("Error while creating song", {
      invalidArgs: Object.keys(args)
    });
  }
};

const removeSong = async (parent, args, context, info) => {
  try {
    const { songId } = args;
    const deletedSong = await mongoose.model("song").findByIdAndDelete(songId);
    deletedSong.album.forEach(albumId => {
      mongoose.model("album").findById(albumId, function(err, doc) {
        doc.songs.pull({ _id: songId });
        doc.save();
      });
    });
    return deletedSong;
  } catch (error) {
    throw new UserInputError("Error while deleting song", {
      invalidArgs: Object.keys(args)
    });
  }
};

module.exports = {
  getSong,
  addSong,
  removeSong
};
