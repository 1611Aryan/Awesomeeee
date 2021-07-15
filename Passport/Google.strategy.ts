import { PassportStatic } from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import User from "../Models/user.model"
import { GOOGLE_CALLBACK_URL } from "../Utilities/Endpoints"

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
          callbackURL: GOOGLE_CALLBACK_URL,
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
