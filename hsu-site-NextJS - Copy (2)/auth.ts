// auth.ts

import NextAuth from "next-auth";
import Cognito from "next-auth/providers/cognito";

export const {
  auth,
  handlers,
  signIn,
  signOut,
} = NextAuth({
  providers: [Cognito],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // On sign-in, preserve Cognito's stable
      // user identifier in the JWT.
      if (account && profile?.sub) {
        token.userId = profile.sub;
      }

      return token;
    },

    async session({ session, token }) {
      if (
        session.user &&
        typeof token.userId === "string"
      ) {
        session.user.id = token.userId;
      }

      return session;
    },
  },
});