import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri:'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       feed: {
    //         keyArgs: ["category"],
    //       },
    //     },
    //   },
    // },
  })
})

export default client