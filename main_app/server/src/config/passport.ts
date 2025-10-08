import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


passport.serializeUser((user: IUser, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/api/users/auth/google/callback',

    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find existing user by Google ID or email
        const email = profile.emails && profile.emails[0].value;
        if (!email) {
          return done(new Error('No email found in Google profile'), false);
        }

        let user = await User.findOne({ email });

        if (!user) {
          // Create new user if not found
          user = new User({
            name: profile.displayName,
            email,
            password: '', // No password for OAuth users
            role: 'farmer', // Default role, adjust as needed
            isPhoneVerified: false,
            phoneVerificationToken: '',
            phoneVerifiedAt: null,
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export const generateJwtToken = (user: any) => {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
};
