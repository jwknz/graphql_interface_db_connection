import { uuid } from 'uuidv4';

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
        
        family: async (parent, args, context) => {
            const { id } = args
            return context.prisma.family.findUnique({
              where: {
                id,
              }
            })
          },

        families: async (parent, args, context) => {
            return context.prisma.family.findMany();
        },

        members: async (parent, args, context) => {
            return context.prisma.member.findMany();
        },

        groups: async (parent, args, context) => {

            let keys = Object.keys(context.prisma._dmmf.modelMap)

            let total = []

            for(let k in keys) {

                let temp = await context.prisma[keys[k].toLowerCase()].findMany()
                total.push(temp)
            }

            let flat = total.flat()

            return flat

        },

        group: async (parent, args, context) => {
            
            let keys = Object.keys(context.prisma._dmmf.modelMap)

            let total = []

            for(let k in keys) {

                let temp = await context.prisma[keys[k].toLowerCase()].findMany()
                total.push(temp)

            }

            let flat = total.flat()

            let filtered = flat.filter(fl => fl.id == args.id)

            return filtered

        }

    },

    Mutation: {

        createFamily: (parent, args, context, info) => {

            console.log(args)

            const newFamily = context.prisma.family.create({
              data: {
                id: uuid(),
                name: args.familyName,
                numberOfPeople: args.numberOfPeople,
              },
            })
            return newFamily
          },

          createMember: (parent, args, context, info) => {

            console.log(args)

            const newMember = context.prisma.member.create({
              data: {
                id: uuid(),
                name: args.givenName,
                age: args.age,
              },
            })
            return newMember
          }

    }

}