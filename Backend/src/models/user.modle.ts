import mongoose from "mongoose";
import { TUserDocument } from "../types/user.type.js";

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

const UserModel = mongoose.models.User || mongoose.model<TUserDocument>("User", userSchema);

export default UserModel;