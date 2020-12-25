import { gql } from 'apollo-server-express';

export const typeDefs = gql`

    type Family {
        id: ID!
        familyName: String! # family last name
    }

    type Member {
        id: ID!
        givenName: String! # persons first name
    }

    type Query {
        families: [Family]
        members: [Member]
    }

    type Mutation {
        createFamily(familyName: String!): Family!
        createMember(givenName: String!) : Member!
    }

`
