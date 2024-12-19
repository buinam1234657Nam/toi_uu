import User from "../model/user.model"

interface ISingin {
    email: string;
    password: string;
}
const singin = async (data: ISingin) => {
    try {
        const checkUser = await User.findOne({ email: data.email, password: data.password })
        if (checkUser) {
            return checkUser
        }
        else {
            throw Error("Information is incorrect")
        }
    } catch (error) {
        console.log(error)
        throw Error("Information is incorrect")
    }
}
export default {
    singin,

}