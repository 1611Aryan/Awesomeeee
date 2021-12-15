/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PassportStatic } from "passport"
import { Mixin } from "ts-mixer"
import Google from "./Google.strategy"

import JWT from "./JWT.strategy"

import Local from "./Local.strategy"

class PassportConfig extends Mixin(Local, JWT, Google) {
  constructor(passport: PassportStatic) {
    super(passport)
    this.passport = passport
    this.init()
  }

  init = () => {
    this.login()
    this.signup()
    this.delete()
    this.jwt()
    this.google()
  }
}
export default PassportConfig
