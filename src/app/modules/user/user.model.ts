import { Schema, model } from "mongoose";
import { ERole, IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    photo: { type: String, required: true },
    role: {
      type: String,
      enum: ERole,
      default: ERole.student,
    },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.BCRYPT_SALT));
});
UserSchema.post("save", async function (doc, next) {
  doc.password = "";
});

export const User = model("User", UserSchema);
