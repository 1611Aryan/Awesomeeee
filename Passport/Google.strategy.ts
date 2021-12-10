import { PassportStatic } from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import User from "../Models/user.model"
import { GOOGLE_CALLBACK_URL } from "../Utilities/Endpoints"
import { nanoid } from "nanoid"

class Google {
  protected passport: PassportStatic

  constructor(passport: PassportStatic) {
    this.passport = passport
  }

  createUsername = (email: string): string => email.split("@", 1)[0]

  genPassword = (length = 12): string => nanoid(length)

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
            console.log(profile)
            const user = await User.findOne({ email: profile.email })
            if (user) return done(null, user)
            else {
              const newUser = await User.create({
                email: profile.email,
                username: this.createUsername(profile.email),
                password: this.genPassword(),
                strategyUsed: "google",
                profilePicture: {
                  thumbnail: profile.picture,
                  large: profile.picture,
                },
              })

              return done(null, newUser)
            }
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
