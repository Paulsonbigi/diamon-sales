import mongoose, { Schema } from "mongoose";
export const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },

  phonenumber: {
    type: String,
  },

  password: {
    type: String,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
  },
});

UserSchema.index({ "$**": "text" });
export const UserModel = mongoose.model("user", UserSchema);
