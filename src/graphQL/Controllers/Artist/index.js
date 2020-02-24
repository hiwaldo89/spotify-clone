const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server");

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

module.exports = {
  addArtist
};
