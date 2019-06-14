const graphql = require('graphql');

// Destructure GraphQL functions
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// Import Controllers
const accountController = require('../controllers/accountController');

// Define Object Types
const accountType = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({})
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    account: {},
    accounts: {}
  }
});

// Define Mutations
const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addAccount: {
      type: accountType,
      args: {},
      async resolve(args) {
        return '';
      }
    },
    editAccount: {
      type: accountType,
      args: {},
      async resolve(args) {
        return '';
      }
    },
    deleteAccount: {
      type: accountType,
      args: {},
      async resolve(args) {
        return '';
      }
    }
  }
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
