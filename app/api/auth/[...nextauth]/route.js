import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // 1. Tell NextAuth to expect 'role' from the form
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
      },
      async authorize(credentials) {
        // Ensure all credentials are provided
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.role
        ) {
          throw new Error('Missing credentials');
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        // 2. IMPORTANT: Check if the selected role matches the user's role in the DB
        if (user.role.toLowerCase() !== credentials.role.toLowerCase()) {
          throw new Error('Access denied for the selected role');
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error('Invalid email or password');
        }

        // 3. Return the user object, including the role, on success
        // This object is passed to the JWT callback
        return {
          id: user._id,
          email: user.email,
          name: user.firstname, // Or whatever name property you use
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    // Make sure this points to your actual login page
    signIn: '/login',
  },

  callbacks: {
    // 4. Add the user's role to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // 5. Add the role from the token to the session object
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
