import { Family, Member } from "../mongo/models";
import { ObjectID } from 'mongodb'
import mongoose from 'mongoose'

export const resolvers = {

    Group: {

        __resolveType(groups, context, info){

            console.log(groups)

            if(groups.numberOfPeople){
                return 'Family';
            }
        
            else if(groups.age){
                return 'Member';
            }

            return null
        },

    },

    //Array.from(...[Family.find(), Member.find()])

    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`,
        groups: async () => {

            let types = mongoose.modelNames()

            let total = []

            for(let t of types) {
                let temp = await mongoose.model(t).find()
                total.push(temp)
            }

            let flat = total.flat()

            return flat

        },
        group: (_, { id }) => {
            
            return mongoose.modelNames().map(async mn => {

                if (await mongoose.model(mn).exists({"_id": ObjectID(id)})) {
                    return mongoose.model(mn).findOne({"_id": ObjectID(id)})
                } 

            })

        },
        families: () => Family.find(),
        members: () => Member.find(),
    },

    Mutation: {

        createFamily: async (_, { familyName, numberOfPeople }) => {
            const family = new Family({ name: familyName, numberOfPeople: numberOfPeople })
            await family.save()
            return family
        },

        createMember: async (_, { givenName, age }) => {
            const member = new Member({ name: givenName, age: age })
            await member.save()
            return member
        }

    }

}