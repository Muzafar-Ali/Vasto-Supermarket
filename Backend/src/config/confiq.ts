import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  environment: process.env.ENV_NODE,
  mongoURI: process.env.MONGO_URI,
  sameSiteValue: "strict",
  jwtSecret: process.env.JWT_SECRET,
  accessTokenExpiresIn: 24 * 60 * 60 * 1000, // 24 hours
  accessTokenCookieExpiresIn: 24 * 60 * 60 * 1000, // 24 hours
  refreshTokenExpiresIn: 30 * 24 * 60 * 60 * 1000, // 30 days, 
  refreshTokenCookieExpiresIn: 30 * 24 * 60 * 60 * 1000, // 30 days,
  saltWorkFactor: process.env.SALT,
}

export default config;