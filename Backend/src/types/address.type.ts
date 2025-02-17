import mongoose from "mongoose"

export type TAddress = {
  addressLine: String;
  city: String;
  state: String;
  postalCode: String;
  country: String;
  mobile: String;
  email: String;
  active: Boolean;
}

export type TAddressDocument = TAddress & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}