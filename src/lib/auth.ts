import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";

export const authResponseSchema = z.object({
  access_token: z.string(),
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
  }),
});

export type AuthResponseDto = z.infer<typeof authResponseSchema>;

// Extended types for NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string;
      accessToken?: string;
    };
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string;
    role?: string;
    accessToken?: string;
    exp?: number; // JWT expiration time
  }
}

// NextAuth setup
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          console.log("response", response.status);
          if (!response.ok) return null;
          const responseData = (await response.json()).data as AuthResponseDto;
          if (responseData.user)
            return {
              id: responseData.user.id,
              email: responseData.user.email,
              name: `${responseData.user.firstname} ${responseData.user.lastname}`,
              accessToken: responseData.access_token,
            };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email as string;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      // Check if the token has expired and log the user out
      if (token.accessToken) {
        try {
          const decodedToken = jwtDecode(token.accessToken) as { exp: number };

          const currentTime = Date.now() / 1000; // Current time in seconds

          if (decodedToken.exp < currentTime) {
            // Token has expired, create a minimal valid token instead of returning null
            return {
              id: token.id || "",
              email: token.email || "",
              exp: 0,
            };
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          // Return minimal valid token instead of null
          return {
            id: token.id || "",
            email: token.email || "",
            exp: 0,
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
};
