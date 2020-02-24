const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    year: {
      type: Date,
      required: true
    },
    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: "artist"
      }
    ],
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "song"
      }
    ]
  },
  { timestamps: true }
);

module.exports = AlbumSchema;

Schema.Types.ObjectId.prototype.valueOf = function() {
  return this.toString();
};
