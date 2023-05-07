import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "", // TODO: env validation with zod
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "signin",
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      const permittedEmails = process.env.PERMITTED_EMAILS?.split(",");

      if (account?.provider === "google" && profile?.email && permittedEmails) {
        return permittedEmails.includes(profile.email);
      }

      return true;
    },
  },
};
