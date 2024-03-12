import {Arg, Field, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import {User} from "../entity/User";
import bcrypt from "bcryptjs";
import {RegisterUserInput} from "../inputs/RegisterUserInput";
import {sign} from "jsonwebtoken";
import {LoginUserInput} from "../inputs/LoginUserInput";


@Resolver()
export class AuthResolver {
  // TODO: Add a query to get all users
  @Query(() => [User])
  users() {
    return User.find()
  }

  //   TODO: register user mutation


  @Mutation(() => RegisterResponse)
  async registerUser(
    @Arg("data", {validate: false}) data: RegisterUserInput
  ): Promise<RegisterResponse> {
    try {
      const {password} = data;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({...data, password: hashedPassword});
      await user.save();
      const token = sign({userId: user.id}, "mysecret", {expiresIn: "1d"});
      return {
        user,
        token
      };
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  }

  @Mutation(() => RegisterResponse)
  async loginUser(
    @Arg("data", {validate: false}) {email, password}: LoginUserInput
  ): Promise<RegisterResponse> {
    try {
      const user = await User.findOne({where: {email}});
      if (!user) {
        throw new Error("Invalid login");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid login");
      }
      const token = sign({userId: user.id}, "mysecret", {expiresIn: "1d"});
      return {
        user,
        token
      };

    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }
}

@ObjectType()
export class RegisterResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
