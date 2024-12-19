import { error } from "console";
import User, { IUser } from "../model/user.model";
import cartService from "./cart.service";
export interface IUpdateAccount {
    _id: string;
    email: string;
    name?: string;
    password?: string;
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
        const result = await User.create({ ...data });
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
        const user = await User.findById(_id);
        if (data.newPassWord) {
            if (user?.password !== data.password) {
                throw Error("Password is incorrect");
            }
            else {
                await User.updateOne({ _id: _id }, {

                    ...data,
                    password: data.newPassWord,
                    confirmPassword: data.newPassWord
                });
            }
        }
        else {
            await User.updateOne({ _id: _id }, {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                avatar: data.avatar
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