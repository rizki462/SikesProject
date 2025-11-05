import { Request, Response } from "express";
import * as Yup from "yup";

// Model
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";

// Schema Register
type TRegister = {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Schema Login
type TLogin = {
    identifier: string;
    password: string;
}


const registerValidateSchema = Yup.object({
    fullname: Yup.string().required(),
    username: Yup.string().min(5, "Username minimal harus 5 karakter").required(),
    email: Yup.string().email("Email tidak valid").required(),
    password: Yup.string().min(8, "Password minimal harus 8 karakter").required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password tidak sama").required()
});

export default {
    async register(req: Request, res: Response) {
        const { fullname, username, email, password, confirmPassword } = req.body as unknown as TRegister;

        try {
            await registerValidateSchema.validate({ fullname, username, email, password, confirmPassword });
            const result = await UserModel.create({ fullname, username, email, password, role: 'user' });
            res.status(200).json({ message: "Register Success", data: result });
        } catch (error) {
            const err = error as unknown as Error
            res.status(400).json({ message: err.message, data: null });
        }
    },

    async login(req: Request, res: Response) {
        const { identifier, password } = req.body as unknown as TLogin;

        try {
            // Ambil data user berdasarkan Identifier -> (email dan username)
            const userByIdentifier = await UserModel.findOne({
                $or: [
                    { username: identifier },
                    { email: identifier }
                ]
            })
            // Validasi identifier user
            if (!userByIdentifier) {
                return res.status(400).json({
                    message: "User tidak ditemukan",
                    data: null
                });
            }

            // Validasi password
            const validatePassword: Boolean = encrypt(password) === userByIdentifier.password;
            if (!validatePassword) {
                return res.status(400).json({
                    message: "Password salah",
                    data: null
                });
            };

            res.status(200).json({
                message: "Login Success",
                data: userByIdentifier
            });

        } catch (error) {
            const err = error as unknown as Error
            res.status(400).json({ message: err.message, data: null });
        }
    }
} 