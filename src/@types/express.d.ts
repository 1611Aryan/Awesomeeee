export interface UserI {
  id: string
  iat?: string
  username: string
}

declare global {
  namespace Express {
    interface User extends UserI {}
    export interface Request {
      user: UserI
    }
  }
}
