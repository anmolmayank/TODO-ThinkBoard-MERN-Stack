import mongoose from "mongoose";

// Define the User auth schema
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Instance methods
userSchema.methods.setPassword = async function (plain) {
  this.passwordHash = await bcrypt.hash(plain, 10);
};

userSchema.methods.validatePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

// Create the user auth model
const userModel = mongoose.model("User", userSchema);
export default userModel;
