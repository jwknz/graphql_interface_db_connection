import { gql } from 'apollo-server-express';
import { GraphQLObjectType } from 'graphql'

export const typeDefs = gql`

    interface Group {
        id: ID!
        name: String!
    }

    type Family implements Group {
        id: ID!
        name: String! # persons family name
        numberOfPeople: Int
    }

    type Member implements Group {
        id: ID!
        name: String! # persons first name
        age: Int
    }

    type Query {
        hello(name: String): String!
        groups: [Group]
        group(id: String): [Group]
        families: [Family]
        members: [Member]
    }

    type Mutation {
        createFamily(familyName: String!, numberOfPeople: Int): Family!
        createMember(givenName: String!, age: Int) : Member!
    }

`
