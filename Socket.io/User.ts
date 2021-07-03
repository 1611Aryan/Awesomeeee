import { user } from "./types"

class User {
  private users: user[]

  constructor() {
    this.users = []
  }

  allUsers = (): user[] => this.users

  addUser = (user: user): User => {
    this.users.push(user)
    return this
  }

  addRooms = (socketId: user["socketId"], rooms: user["rooms"]): void => {
    this.users = this.users.map(u => {
      if (u.socketId === socketId) u.rooms = rooms
      return u
    })
  }

  getUser = (socketId: user["socketId"]): user =>
    this.users.find(u => u.socketId === socketId)

  getActiveContacts = ({
    rooms,
    myId,
  }: {
    rooms: string | string[]
    myId: user["socketId"]
  }): string[] => {
    const contactIds: string[] = []

    this.users.forEach(user => {
      if (user.socketId !== myId) {
        let isContact = false

        for (let i = 0; i < user.rooms.length; i++) {
          if (Array.isArray(rooms)) {
            isContact = rooms.some(room => room === user.rooms[i])
            break
          } else if (user.rooms[i] === rooms) {
            isContact = true
            break
          }
        }

        isContact && contactIds.push(user.userId)
      }
    })

    return contactIds
  }

  removeUser = (socketId: user["socketId"]): User => {
    this.users = this.users.filter(u => u.socketId !== socketId)

    return this
  }

  isOnline = (userId: user["userId"]): boolean => {
    const user = this.users.find(u => u.userId === userId)
    return user ? true : false
  }
}

export default User
