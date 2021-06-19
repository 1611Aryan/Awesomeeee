/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PassportStatic } from "passport"
import { Mixin } from "ts-mixer"
import JWT from "./JWT.Strategy"

import Local from "./Local.strategy"

class PassportConfig extends Mixin(Local, JWT) {
  constructor(passport: PassportStatic) {
    super(passport)
    this.passport = passport
  }

  serialize = () =>
    this.passport.serializeUser((user, done) => done(null, user))

  deserialize = () =>
    this.passport.deserializeUser((user, done) => done(null, user))

  init = () => {
    this.login()
    this.signup()
    this.delete()
    this.jwt()
    this.serialize()
    this.deserialize()
  }
}
export default PassportConfig
