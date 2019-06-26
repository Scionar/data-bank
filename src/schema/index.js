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
const sessionController = require('../controllers/sessionController');

// Define Object Types
const accountType = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    salt: { type: GraphQLString },
    sessions: {
      type: new GraphQLList(sessionType),
      async resolve(parent, args) {
        return await sessionController.findSessionsByAccountId({
          id: parent._id
        });
      }
    }
  })
});

const sessionType = new GraphQLObjectType({
  name: 'Session',
  fields: () => ({
    _id: { type: GraphQLID },
    account_id: { type: GraphQLID },
    key: { type: GraphQLString },
    timestamp: { type: GraphQLString }
  })
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    account: {
      type: accountType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await accountController.getSingleAccount(args);
      }
    },
    accounts: {
      type: new GraphQLList(accountType),
      async resolve(parent, args) {
        return await accountController.getAccounts();
      }
    },
    session: {
      type: sessionType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await sessionController.getSingleSession(args);
      }
    },
    sessions: {
      type: new GraphQLList(sessionType),
      async resolve(parent, args) {
        return await sessionController.getSessions();
      }
    }
  }
});

// Define Mutations
const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addAccount: {
      type: accountType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const data = await accountController.addAccount(args);
        return data;
      }
    },
    editAccount: {
      type: accountType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const data = await accountController.updateAccount(args);
        return data;
      }
    },
    deleteAccount: {
      type: accountType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        const data = await accountController.deleteAccount(args);
        return data;
      }
    },
    addSession: {
      type: sessionType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const data = await sessionController.addSession(args);
        return data;
      }
    },
    deleteSession: {
      type: sessionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        const data = await sessionController.deleteSession(args);
        return data;
      }
    }
  }
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
