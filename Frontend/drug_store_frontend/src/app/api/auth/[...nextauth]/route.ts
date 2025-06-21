// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'

// Define the expected structure of the login API response
type LoginResponse = {
  error: any;
  message: any;
  success: boolean;
  user?: {
    id: string;
    email: string;
    name?: string;
    // Add any other user fields you expect
  };
  // Add any other fields returned by your API
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
        async authorize(credentials): Promise<User | null> {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
          }

        try {
          const response = await fetch("http://127.0.0.1:8000/drugstore/auth/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data: LoginResponse = await response.json();

          if (!response.ok) {
            const message = data?.message || data?.error || "Login failed";
            throw new Error(message); // This message will show up in result.error
          }

          if (!data.user) {
            throw new Error("No user data received from server");
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
          };
        } catch (error: any) {
          console.error("Auth error:", error);
          throw new Error(error.message || "An unknown error occurred");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: { 
      token: JWT; 
      user?: User | import("next-auth").User; 
      account?: any; 
      profile?: any; 
      isNewUser?: boolean; 
    }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };