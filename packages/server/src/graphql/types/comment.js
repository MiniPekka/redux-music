const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const UserType = require('./user');
const { BASE_V1, CLIENT_ID } = require('../consts');

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    created_at: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    user_id: {
      type: GraphQLInt,
    },
    user: {
      type: UserType,

      resolve(parentValue) {
        return axios
          .get(`${BASE_V1}/users/${parentValue.user_id}?client_id=${CLIENT_ID}`)
          .then(res => res.data);
      },
    },
    track_id: {
      type: GraphQLInt,
    },
  }),
});

module.exports = CommentType;
