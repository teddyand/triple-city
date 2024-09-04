import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
//import TwitterProvider from "next-auth/providers/twitter";
//import EmailProvider from "next-auth/providers/email";
//import Auth0Provider from "next-auth/providers/auth0";

//import { createTransport } from "nodemailer"
 
import "dotenv/config";
 
export default NextAuth({
  adapter: UpstashRedisAdapter(
    new Redis({
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN,
    }),
    { baseKeyPrefix: "app-specific-prefix-1:" },
  ),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    //TwitterProvider({
    //clientId: process.env.TWITTER_ID,
    //clientSecret: process.env.TWITTER_SECRET
  //})
  ],  
});



