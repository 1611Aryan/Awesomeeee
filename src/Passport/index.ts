import { PassportStatic } from "passport"
import { Mixin } from "ts-mixer"
import Google from "./Google.strategy.js"

import JWT from "./JWT.strategy.js"

import Local from "./Local.strategy.js"

class PassportConfig extends Mixin(Local, JWT, Google) {
  constructor(passport: PassportStatic) {
    super(passport)
    this.init()
  }

  init = () => {
    this.login()
    this.signup()
    this.delete()
    this.jwt()
    this.googleLogin()
    this.googleSignup()
  }
}
export default PassportConfig
