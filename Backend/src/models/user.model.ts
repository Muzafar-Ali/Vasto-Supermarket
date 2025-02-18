import mongoose from "mongoose";
import { TUserDocument } from "../types/user.type.js";
import bcrypt from "bcryptjs";
import config from "../config/confiq.js";

const userSchema = new mongoose.Schema<TUserDocument>({
  name: { 
    type: String, 
    required: [true, "name is required"] 
  },
  email: { 
    type: String, 
    required: [true, "email is required"], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true, "must provide password"] 
  },
  avatar: { 
    type: String, 
    default: "" 
  },
  mobile: { 
    type: Number, 
    default: null
  },
  refreshToken: { 
    type: String, 
    default: ""
  },
  verifyEmail: { 
    type: Boolean, 
    default: false 
  },
  lastLoginDate: { 
    type: Date,
    default: "" 
  },
  status: { 
    type: String, 
    enum: ["active", "inactive", "suspended"], 
    default: "active" 
  }, 
  shoppingCart: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "CartItem" 
  }],
  orderHistory: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Order" 
  }],
  forgotPasswordOtp: { 
    type: String,
    default: null 
  },
  forgotPasswordExpiry: { 
    type: Date,
    defualt: "" 
  },
  role: { 
    type: String, 
    enum: ["admin", "user"], 
    default: "user" 
  },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  const user = this as TUserDocument;
  
  if(!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(Number(config.saltWorkFactor));
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

  } catch (error: any) {
    console.error('Error during password hashing:', error);
    next(error);
  }
  next();
})

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  const user = this as TUserDocument;
  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password);      
    return isMatch;
    
  } catch (error) {
    console.error("comparePassword error = ", error);
    return false
  }
}

const UserModel = mongoose.models.User || mongoose.model<TUserDocument>("User", userSchema);

export default UserModel;