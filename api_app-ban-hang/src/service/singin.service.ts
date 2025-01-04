import User from "../model/user.model";
import bcrypt from "bcrypt";
import { genneralAccessToken, genneralRefreshToken, refreshTokenJwtService } from "./jwt.service";

interface ISignIn {
  email: string;
  password: string;
}

const signin = async (data: ISignIn) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = data;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
        return;
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
        return;
      }
      // Tạo access_token và refresh_token
      const access_token = await genneralAccessToken({
        id: user.id,
      });

      const refresh_token = await genneralRefreshToken({
        id: user.id,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        email: email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        access_token,
        refresh_token,
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
