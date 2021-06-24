import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: { 
        type: String,
        trim: true,
        required: true
    },
    lastName: { 
        type: String,
        trim: true,
        required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Minimum length must be 8 chars"],
      trim: true,
    },
    profilePic: {
      type: String,
      trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "User"],
        default: "User",
        immutable: true,
      },
    refreshToken: { type: String },
    googleId: { type: String },
  },
  { timestamps: true }
);


export default model("User", userSchema);