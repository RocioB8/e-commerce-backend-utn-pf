import { Types } from "mongoose"

interface Ipayload {
  _id: Types.ObjectId
  email: string
  username: string
}

export { Ipayload }