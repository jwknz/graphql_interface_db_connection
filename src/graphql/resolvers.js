import { Family, Member } from "../mongo/models";

export const resolvers = {

    Query: {
        families: () => Family.find(),
        members: () => Member.find(),
    },

    Mutation: {

        createFamily: async (_, { familyName }) => {
            const family = new Family({ familyName })
            await family.save()
            return family
        },

        createMember: async (_, { givenName }) => {
            const member = new Member({ givenName })
            await member.save()
            return member
        }

    }

}