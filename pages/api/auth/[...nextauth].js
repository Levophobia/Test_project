import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/userSchema";
import { compare } from "bcryptjs";

export default NextAuth({
    providers: [
      CredentialsProvider({
        name: "Credentials",
        async authorize(credentials, req) {
          connectMongo().catch((error) => {
            error: "Connection failed...";
          });
  
          const result = await Users.findOne({ email: credentials.email });
          if (!result) {
            throw new Error("No user found with this email");
          }
  
          const checkPassword = await compare(
            credentials.password,
            result.password
          );
  
          if (!checkPassword || result.email !== credentials.email) {
            throw new Error("Username or password doesnt match");
          }
  
          return result
        },
      }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
          if (user) {
            token.id = user.id;
            token.username = user.username
            token.role = user.role
            token.adress = user.adress
            token.zipcode = user.zipcode
            token.city = user.city
          }
          return token;
        },
        session: ({ session, token }) => {
          if (token) {
            session.id = token.id;
            session.username = token.username
            session.role = token.role
            session.adress = token.adress
            session.zipcode = token.zipcode
            session.city = token.city
          }
          return session;
        },
      },
      secret: "test",
      jwt: {
        secret: "test",
        encyption: true,
      },
    });