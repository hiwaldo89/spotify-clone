const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    album: [
      {
        type: Schema.Types.ObjectId,
        ref: "album"
      }
    ]
  },
  { timestamps: true }
);

mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString();
};

module.exports = SongSchema;
