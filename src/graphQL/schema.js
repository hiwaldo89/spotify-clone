const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Artist {
    _id: ID
    name: String
    albums: [ID]
    createdAt: Date
    updatedAt: Date
  }

  type Album {
    _id: ID
    title: String
    year: Date
    artists: [ID]
    songs: [ID]
    createdAt: Date
    updatedAt: Date
  }

  type Song {
    _id: ID
    title: String
    duration: Float
    album: [ID]
    createdAt: Date
    updatedAt: Date
  }

  input ArtistInput {
    name: String
  }

  input AlbumInput {
    title: String
    year: Date
    artists: [ID]
  }

  input SongInput {
    title: String
    duration: Float
    album: [ID]
  }

  type Query {
    getSong(songId: ID): Song
  }

  type Mutation {
    addArtist(artistData: ArtistInput): Artist
    addAlbum(albumData: AlbumInput): Album
    addSong(songData: SongInput): Song
  }
`;

module.exports = typeDefs;
