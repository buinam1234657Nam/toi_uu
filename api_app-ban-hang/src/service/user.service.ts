import { error } from "console";
import User, { IUser } from "../model/user.model";
import cartService from "./cart.service";
import bcrypt from "bcrypt";
import { saltLength } from "../constants";
import basicXSSSanitizer from "../utils/basicXSSSanitizer";

export interface IUpdateAccount {
    _id: string;
    email: string;
    name?: string;
    password: string;
    confirmPassword?: string;
    avatar?: string | null;
    phone?: string;
    address?: string;
    newPassWord?: string;
}
const getUsersAll = async () => {
    try {
        const result = await User.find({});
        return result
    } catch (error) {
        console.log(error)
        throw error;
    }
}
const getUserDetail = async (id: string) => {
    try {
        const result = await User.findOne({ _id: id });
        return result
    } catch (error) {
        console.log(error)
        throw error;
    }
}
const createUser = async (data: IUser) => {
    try {
        const errors: string[] = [];

        const existingEmail = await User.findOne({ email: data.email });
        if (existingEmail) {
            errors.push("Email already exists");
        }
        if (errors.length > 0) {
            const error = new Error(errors.join(", "));
            throw error;
        }
        const passwordBcrypt = await bcrypt.hash(data.password,saltLength);
        const result = await User.create({ 
            ...data,
            password:basicXSSSanitizer(passwordBcrypt),
            confirmPassword:basicXSSSanitizer(passwordBcrypt)
         });
        cartService.createCart(result._id as string)
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
// can phai sua
const updateUser = async ({ _id, ...data }: IUpdateAccount) => {
    const { email, ...updatedData } = data;
    try {
        let oldPassword;
        const user = await User.findById(_id);
        if (data.newPassWord && user) {
            const newPasswordBcrypt = await bcrypt.hash(data.newPassWord,saltLength)
            oldPassword = await bcrypt.compare(data.password,user.password)
            if (!oldPassword) {
                throw Error("Password is incorrect");
            }
            else {
                await User.updateOne({ _id: _id }, {
                    ...data,
                    password: basicXSSSanitizer(newPasswordBcrypt),
                    confirmPassword:  basicXSSSanitizer(newPasswordBcrypt)
                });
            }
        }
        else {
            await User.updateOne({ _id: _id }, {
                name: data.name && basicXSSSanitizer(data.name),
                email: data.email && basicXSSSanitizer(data.email),
                phone: data.phone && basicXSSSanitizer(data.phone),
                address: data.address && basicXSSSanitizer(data.address),
                avatar: data.avatar && basicXSSSanitizer(data.avatar)
            });
        }
        return user;
    } catch (error) {
        throw Error("Password is incorrect");
    }
}
const deleteUser = async (id: string) => {
    try {
        const result = await User.deleteOne({ _id: id });
        return result
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export default {
    createUser,
    updateUser,
    getUsersAll,
    getUserDetail,
    deleteUser
};

