import bcrypt from "bcrypt"
import { Schema, model, Document } from "mongoose"
import { IVerifyOptions } from "passport-local"
import { DEFAULT_PROFILE_IMAGE } from "../Utilities/Endpoints"

export type contactI = {
  //Document id
  _id: Document["_id"]
  //User Entered => won't change automatically
  //Mutable
  name: string
  //Mutable
  username: string
  //Immutable
  contactId: string
  //URL=> image/id=>wont change
  profilePicture: { thumbnail: string; large: string }
  //Constant
  roomId: string
  lastSeen: string
  lastMessage: string
}

export type UserI = {
  _id: string
  username: string
  email: string
  phone: string
  profilePicture: {
    thumbnail: string
    large: string
    fileId: string
  }
  contacts: contactI[]
  password: string
  profileSetup: boolean
  strategyUsed: string

  setPassword: (password: UserI["password"]) => Promise<string>
  validatePassword: (
    password: string,
    done: (error: unknown, user?: unknown, options?: IVerifyOptions) => void
  ) => Promise<boolean | void>
}

const UserSchema = new Schema<UserI>(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: {
        thumbnail: String,
        large: String,
      },
      required: true,
      default: {
        fileId: DEFAULT_PROFILE_IMAGE.FILE_ID,
        thumbnail: DEFAULT_PROFILE_IMAGE.THUMBNAIL,
        large: DEFAULT_PROFILE_IMAGE.LARGE,
      },
    },
    contacts: {
      type: [
        {
          name: String,
          username: String,
          profilePicture: {
            thumbnail: String,
            large: String,
          },
          contactId: String,
          roomId: String,
          lastSeen: String,
          lastMessage: String,
        },
      ],
      required: true,
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
    strategyUsed: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
  next()
})

UserSchema.methods.validatePassword = async function (
  password: UserI["password"],
  done: (error: unknown, user?: unknown, options?: IVerifyOptions) => void
) {
  try {
    const res = await bcrypt.compare(password, this.password)
    return res
  } catch (err) {
    return done(err)
  }
}

const User = model<UserI>("user", UserSchema, "users")

export default User
