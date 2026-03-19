import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    avatarImage: String
    games: [Game]
  }

  type Game {
    id: ID!
    title: String!
    genre: String
    platform: String
    releaseYear: Int
    developer: String
    rating: Float
    description: String
    imageUrl: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    games: [Game]!
    game(id: ID!): Game
    searchGames(query: String!): [Game]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    updateProfile(email: String, avatarImage: String): User!
    addFavoriteGame(gameId: ID!): User!
    removeFavoriteGame(gameId: ID!): User!
  }
`;

export default typeDefs;
