import { Mutation } from 'apollo-server-core/src/plugin/schemaReporting/generated/operations';
import { Query } from 'express-serve-static-core';
import { randomUUID } from 'node:crypto';
import { ApolloServer, gql } from "apollo-server";


// syntax high-light

/**
 * Criado para resolver dois problemas primordiais em API'S 
 * Under fetching
 * 
 * Rota HTTP que retorna dados de menos - Exemplo (Dashboard, não trazer todos os pots por uma rota API apenas)
 * 
 * Over fetching
 * 
 * Rota HTTP retorna mais dados que precisamos
 */

/**
 * Schema first approach
 * Code first <--
 * 
 */

const users: String[] = [];

const typeDefs = gql`
    type User {
        id: String!
        name: String!
    }

    type Query {
        users: [User!]
    }

    type Mutation {
        createUser(name: String!): User!
    }
`

interface User {
    id: string
    name: string
}

const server = new ApolloServer({
    typeDefs, 
    resolvers: {
        Query: {
            users: () => {
                return users
            }
        },

        Mutation: {
            createUser: (_, args) => { // parent e ctx não está sendo ultilizado
                const user = { id: randomUUID(), name: args.name,}
                users.push(user);

                return user;
            }
        },
    },
});

server.listen().then(({ url }) => {
    console.log(`HTTP server running on ${url}`);
});