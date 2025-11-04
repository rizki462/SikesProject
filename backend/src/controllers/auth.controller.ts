import { Request, Response } from "express";
import * as Yup from "yup";

// Model
import UserModel from "../models/user.model";

// Schema Register
type TRegister = {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
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
            const resultData = { fullname, username, email};
            res.status(200).json({ message: "Register Success", data: resultData });
        } catch (error) {
            const err = error as unknown as Error
            res.status(400).json({ message: err.message, data: null });
        }
    }  
} 