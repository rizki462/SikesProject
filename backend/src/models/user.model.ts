import mongoose from "mongoose";

export interface User {
    fullname: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string; // URL to profile picture
    isActive: boolean;
    activationCode: string;
    createdAt: Date;
    updatedAt: Date;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    profilePicture: { type: String, default: 'user.jpg' }, // URL to profile picture
    isActive: { type: Boolean, default: false },
    activationCode: { type: Schema.Types.String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;