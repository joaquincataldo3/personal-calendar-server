import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
// test email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// min 8 characters, 1 upper and 1 special character
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
            statusCode: 400,
            message: 'email and password are required',
            });
            return;
        }

        const isValidEmail = emailRegex.test(email);
        if(!isValidEmail){
            res.status(400).json({
                statusCode: 400,
                message: 'invalid email'
            })
            return;
        }

        const isValidPassword = passwordRegex.test(password);
        if(!isValidPassword){
            res.status(400).json({
                statusCode: 400,
                message: 'password must be at least 8 characters, including one uppercase letter and one special character',
            });
            return;
        }

        const sanitizedEmail = email.toLowerCase();
        const existingUser = await prisma.user.findUnique({
         where: { email: sanitizedEmail },
        });
        if(existingUser){
            res.status(409).json({
                statusCode: 409,
                message: 'user already exists',
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email: sanitizedEmail,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            statusCode: 201,
            message: 'successfully created user'
        })
        return;
    } catch (error) {
        console.log('error while registering user');
        console.log(error);
        res.status(500).json({
            statusCode: 500,
            message: 'internal server error'
        });
        return;
    }
}