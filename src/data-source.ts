import "reflect-metadata"
import {DataSource} from "typeorm"
import {User} from "./entity/User";
import {Book} from "./entity/Book";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "8080",
  database: "books",
  synchronize: true,
  logging: false,
  entities: [User, Book],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
})
