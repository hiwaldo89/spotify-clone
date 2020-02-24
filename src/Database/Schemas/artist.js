const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: "album"
      }
    ]
  },
  { timestamps: true }
);

module.exports = ArtistSchema;

Schema.Types.ObjectId.prototype.valueOf = function() {
  return this.toString();
};
