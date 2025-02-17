import mongoose from "mongoose";
import { TAddressDocument } from "../types/address.type.js";

const addressSchema = new mongoose.Schema<TAddressDocument>({
  addressLine : {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  },
},{ timestamps: true })

const AddressModel = mongoose.models.Address || mongoose.model<TAddressDocument>("Address", addressSchema);

export default AddressModel;