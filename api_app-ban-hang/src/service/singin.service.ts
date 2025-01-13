import User from "../model/user.model";
import bcrypt from "bcrypt";
import { genneralAccessToken, genneralRefreshToken, refreshTokenJwtService } from "./jwt.service";

interface ISignIn {
  email: string;
  password: string;
  infoDevice?: string;
}
const signin = async (data: ISignIn) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = null;
      if (data.infoDevice) {
        user = await User.findOne({
          infoDevice: data.infoDevice,
        });
      } else if (data.email && data.password) {
        user = await User.findOne({ email: data.email });
        if (!user) {
          throw new Error("Email does not exist");
        }
        const isPasswordValid = bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }
      } else {
          throw new Error("Invalid data provided");
        }

      if (!user) {
        throw new Error("User not found or invalid infoDevice");
      }
      const access_token = await genneralAccessToken({
        id: user.id,
      });

      const refresh_token = await genneralRefreshToken({
        id: user.id,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        email: user.email,
        access_token,
        refresh_token,
        _id: user._id,
      });
    } catch (error: any) {
      reject({
        status: "ERR",
        message: "Authentication failed",
        error: error.message,
      });
    }
  });
};
const refreshAccessToken = async (refresh_token: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: any = await refreshTokenJwtService(refresh_token);

      if (result.status === "ERR") {
        resolve({
          status: "ERR",
          message: "Refresh token invalid or expired",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "Token refreshed successfully",
        access_token: result.access_token,
      });
    } catch (error: any) {
      reject({
        status: "ERR",
        message: "Failed to refresh token",
        error: error.message,
      });
    }
  });
};

export default {
  signin,
  refreshAccessToken,
};
