const mongoose = require("mongoose");
const ArtistSchema = require("../Schemas/artist");
const AlbumSchema = require("../Schemas/album");
const SongSchema = require("../Schemas/song");

mongoose.model("artist", ArtistSchema);
mongoose.model("album", AlbumSchema);
mongoose.model("song", SongSchema);
