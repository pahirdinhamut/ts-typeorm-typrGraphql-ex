import {MiddlewareFn} from 'type-graphql';
import {verify} from "jsonwebtoken";
import {Request, Response} from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

export const isAuth: MiddlewareFn<MyContext> = async ({context}, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  const parts = authorization.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new Error("Invalid token");
  }

  try {
    const token = parts[1];
    const payload: any = verify(token, "mysecret");
    context.payload = payload;
    return next();
  } catch (error) {
    throw new Error("Not authenticated");
  }
}
