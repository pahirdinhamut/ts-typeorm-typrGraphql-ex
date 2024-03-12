// AppDataSource.initialize().then(async () => {
//
//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)
//
//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)
//
//     console.log("Here you can setup and run express / fastify / any other framework.")
//
// }).catch(error => console.log(error))


import {AppDataSource} from "./data-source";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server";
import {BookResolver} from "./resolvers/BookResolver";
import {AuthResolver} from "./resolvers/AuthResolver";

(async () => {
  await AppDataSource.initialize()
  const schema = await buildSchema({
    resolvers: [BookResolver, AuthResolver],
  });
  const server = new ApolloServer({
    schema,
    context: ({req, res}) => ({req, res}),
  });
  await server.listen(4000);
  console.log('Server has started!');
})()
