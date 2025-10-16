import connectDB from '@/lib/mongodb';
import { LoginValidationSchema } from '@/lib/validators/user';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const { email, password, role } =
            LoginValidationSchema.parse(credentials);

          await connectDB();
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error('Invalid email or password');
          }

          if (user.role.toLowerCase() !== role.toLowerCase()) {
            throw new Error('Access denied for the selected role');
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            throw new Error('Invalid email or password');
          }

          return {
            id: user._id,
            email: user.email,
            name: user.firstname,
            role: user.role,
          };
        } catch (error) {
          throw new Error(error.message || 'Invalid credentials');
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
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
