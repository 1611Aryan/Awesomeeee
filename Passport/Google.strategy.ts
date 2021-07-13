import { PassportStatic } from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import User from "../Models/user.model"

class Google {
  protected passport: PassportStatic

  constructor(passport: PassportStatic) {
    this.passport = passport
  }

  google = (): void => {
    this.passport.use(
      "google",
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL:
            process.env.NODE_ENV === "production"
              ? "https://awesomeeeee.herokuapp.com/auth/google/callback"
              : "http://localhost:5000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const user = await User.findOne({ email: profile.email })
            if (user) return done(null, user)
            else return done("Not found")
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
