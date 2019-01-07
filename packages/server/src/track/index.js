const queries = require('./graphql/query');
// import mutations from './graphql/mutation';

/**
 * Setup GraphQL query fields for current module
 */
function getGraphQLQuery() {
  return {
    ...queries,
  };
}

/**
 * Setup GraphQL mutations for current module
 */
// export function getGraphQLMutation() {
//   return {
//     ...mutations,
//   };
// }

module.exports = {
  getGraphQLQuery,
};
