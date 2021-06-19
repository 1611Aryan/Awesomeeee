import bcrypt from "bcrypt"
import { Schema, model, Document } from "mongoose"
import { IVerifyOptions } from "passport-local"

export interface UserI {
  username: string
  email: string
  phone: string
  profilePicture: {
    thumbnail: string
    large: string
  }
  contacts: {
    //Document id
    _id: Document["_id"]
    //User Entered => won't change automatically
    name: string
    //Immutable
    contactId: string
    //URL=> image/id=>wont change
    profilePicture: UserI["profilePicture"]
    //
    roomId: string
  }[]
  password: string

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
        thumbnail:
          "https://ik.imagekit.io/qhjbxokyvp1/tr:n-media_library_thumbnail/Awesome/60b7fb1209590040ecfecbd9_mcbSfnGOa",
        large:
          "https://ik.imagekit.io/qhjbxokyvp1/Awesome/60b7fb1209590040ecfecbd9_mcbSfnGOa",
      },
    },
    contacts: {
      type: [
        {
          name: String,
          profilePicture: {
            thumbnail: String,
            large: String,
          },
          contactId: String,
          roomId: String,
        },
      ],
      required: true,
      default: [],
    },
    password: {
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
