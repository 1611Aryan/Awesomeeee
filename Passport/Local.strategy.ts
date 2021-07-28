import { PassportStatic } from "passport"

import { Strategy as LocalStrategy } from "passport-local"

import User from "../Models/user.model"

interface UserInput {
  email: string
  username: string
  password: string

  email_username: string
}

class Local {
  protected passport: PassportStatic
  constructor(passport: PassportStatic) {
    this.passport = passport
  }
  createUsername = (email: UserInput["email"]): string => {
    return email.split("@", 1)[0]
  }

  login = (): unknown =>
    this.passport.use(
      "login",
      new LocalStrategy(
        {
          usernameField: "username",
          passwordField: "password",
          session: false,
        },
        async (username, password, done) => {
          try {
            const user = await User.findOne({
              $or: [{ email: username }, { username }],
            })

            if (!user)
              return done(
                {
                  status: 403,
                  message: {
                    type: "username",
                    info: "Incorrect username or email",
                  },
                },
                false
              )

            const passwordIsValid = await user.validatePassword(password, done)

            if (!passwordIsValid)
              return done(
                {
                  status: 403,
                  message: {
                    type: "password",
                    info: "Incorrect password",
                  },
                },
                false
              )

            return done(null, user)
          } catch (err) {
            console.log({ login: err })
            return done(err)
          }
        }
      )
    )

  signup = (): unknown =>
    this.passport.use(
      "signup",
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
          session: false,
        },
        async (email, password, done) => {
          const username = this.createUsername(email)
          try {
            const existingUser = await User.findOne({
              $or: [{ email }, { username }],
            }).lean()

            if (existingUser)
              return done(
                {
                  status: 409,
                  message: {
                    type: "email",
                    info: "Username or Email already taken",
                  },
                },
                false
              )

            const newUser = await User.create({
              email,
              username,
              password,
              strategyUsed: "local",
            })
            return done(null, newUser)
          } catch (err) {
            console.log({ signUp: err })
            return done(err)
          }
        }
      )
    )

  delete = (): unknown =>
    this.passport.use(
      "delete",
      new LocalStrategy(
        { session: false },
        async (username, password, done) => {
          try {
            const user = await User.findOne({ username })

            if (!user) return done(500)

            const passwordIsValid = await user.validatePassword(password, done)

            if (!passwordIsValid)
              return done({ status: 400, message: "Incorrect password" }, false)

            await user.delete()
            return done(null, false, { message: "User Deleted" })
          } catch (err) {
            return done(err)
          }
        }
      )
    )
}

export default Local
