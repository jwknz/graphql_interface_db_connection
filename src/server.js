
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import express from "express";
import expressJwt from "express-jwt";

require('dotenv').config()

const port = 4000;
const app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// import {permissions} from "./graphql/permissions";
import {resolvers} from "./graphql/resolvers";
import {typeDefs} from "./graphql/typeDefs";

const startServer = async () => {
    
    app.get('/', (req, res) => {
        res.send('Welcome to the graphql api. Please read the docs.')
    })
    
    app.use(
        expressJwt({
            secret: `${process.env.JWT_SECRET}`,
            algorithms: ["HS256"],
            credentialsRequired: false
        })
    );
    
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        playground: true,
        context: {
            prisma,
        }
    })
        
    server.applyMiddleware({ app, path: "/graphql" });
    
    app.listen({ port }, () => {
      console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
    });

}

startServer();