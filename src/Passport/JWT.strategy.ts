import { Request } from "express"
import { PassportStatic } from "passport"
import { Strategy as JWTStrategy } from "passport-jwt"
import { logError } from "../Utilities/logging.js"

class JWT {
  protected passport: PassportStatic

  constructor(passport: PassportStatic) {
    this.passport = passport
  }

  private cookieExtractor = (req: Request): string => {
    let jwt = null
    if (req && req.cookies) jwt = req.cookies["JWT"]
    return jwt
  }

  protected jwt = (): void => {
    this.passport.use(
      "jwt",
      new JWTStrategy(
        {
          secretOrKey: process.env.JWT_SECRET,
          jwtFromRequest: this.cookieExtractor,
        },
        (token, done) => {
          try {
            return done(null, token)
          } catch (err) {
            logError({ jwt: err })
            return done(err)
          }
        }
      )
    )
  }
}

export default JWT
