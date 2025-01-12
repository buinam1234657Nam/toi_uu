import User from "../model/user.model";
import bcrypt from "bcrypt";

interface ISignIn {
  email: string;
  password: string;
}

const singin = async (data: ISignIn) => {
  const { email, password } = data;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email does not exist");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }
    return user;
  } catch (error) {
    throw new Error("Authentication failed");
  }
};

export default {
    singin
};
