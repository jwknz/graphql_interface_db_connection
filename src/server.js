
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import express from "express";
import expressJwt from "express-jwt";
import mongoose from 'mongoose';

require('dotenv').config()

const port = 4000;
const app = express();

// import {permissions} from "./graphql/permissions";
import {resolvers} from "./graphql/resolvers";
import {typeDefs} from "./graphql/typeDefs";

const startServer = async () => {

    await mongoose.connect(`mongodb://${process.env.MONGO_URL}`, {
        useNewUrlParser: true, useUnifiedTopology: true
    });
    
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
        playground: true
    })
        
    server.applyMiddleware({ app, path: "/graphql" });
    
    app.listen({ port }, () => {
      console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
    });

}

startServer();