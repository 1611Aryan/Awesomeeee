import { PassportStatic } from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import User from "../Models/user.model"
import {
  GOOGLE_LOGIN_CALLBACK_URL,
  GOOGLE_SIGNUP_CALLBACK_URL,
} from "../Utilities/Endpoints"
import { nanoid } from "nanoid"

class Google {
  protected passport: PassportStatic

  constructor(passport: PassportStatic) {
    this.passport = passport
  }

  createUsername = (email: string): string => email.split("@", 1)[0]

  genPassword = (length = 12): string => nanoid(length)

  googleLogin = (): void => {
    this.passport.use(
      "googleLogin",
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: GOOGLE_LOGIN_CALLBACK_URL,
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await User.findOne({ email: profile.email })
            if (user) return done(null, user)

            return done({
              success: false,
              message:
                "No account found associated with this email. Check your email or Create a new account.",
            })
          } catch (err) {
            console.log({
              google: err,
            })
            return done(err)
          }
        }
      )
    )
  }

  googleSignup = (): void => {
    this.passport.use(
      "googleSignup",
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: GOOGLE_SIGNUP_CALLBACK_URL,
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await User.findOne({ email: profile.email })
            if (user)
              return done({
                success: false,
                message: "Account already exists. Try logging in",
              })

            const newUser = await User.create({
              email: profile.email,
              username: this.createUsername(profile.email),
              password: this.genPassword(),
              strategyUsed: "google",
              profilePicture: {
                thumbnail: profile.picture,
                large: profile.picture,
                fileId: "google-" + profile.picture,
              },
            })

            return done(null, newUser)
          } catch (err) {
            console.log({
              google: err,
            })
            return done(err)
          }
        }
      )
    )
  }
}

export default Google
