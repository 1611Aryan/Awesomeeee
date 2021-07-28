import { PassportStatic } from "passport"
import { Strategy as JWTStrategy } from "passport-jwt"
import { Request } from "express"

class JWT {
  protected passport: PassportStatic

  constructor(passport: PassportStatic) {
    this.passport = passport
  }

  #cookieExtractor = (req: Request): string => {
    let jwt = null
    if (req && req.cookies) jwt = req.cookies["JWT"]
    return jwt
  }

  jwt = (): void => {
    this.passport.use(
      "jwt",
      new JWTStrategy(
        {
          secretOrKey: process.env.JWT_SECRET,
          jwtFromRequest: this.#cookieExtractor,
        },
        (token, done) => {
          try {
            return done(null, token)
          } catch (err) {
            console.log({ jwt: err })
            return done(err)
          }
        }
      )
    )
  }
}

export default JWT
