import mongoose, { Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
interface InstitutionDocument extends mongoose.Document, IUser { }
export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    avatar: string;
    status: number;
    phone: string;
    address: string;
    infoDevice: string;
}
const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
    avatar: { type: String },
    status: { type: Number },
    phone: { type: String },
    address: { type: String },
    infoDevice: { type: String }
}, {
    timestamps: true
});
userSchema.plugin(paginate);
const User = mongoose.model<
    InstitutionDocument,
    mongoose.PaginateModel<InstitutionDocument>
>('user', userSchema, 'users');
export default User;