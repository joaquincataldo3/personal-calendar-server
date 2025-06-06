import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendBadRequest, sendCreated, sendOk, sendServerError } from '../utils/sendResponses';

const prisma = new PrismaClient();
// test email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// min 8 characters, 1 upper and 1 special character
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            sendBadRequest(res, 'email and password are required');
            return;
        }

        const isValidEmail = emailRegex.test(email);
        if(!isValidEmail){
            sendBadRequest(res, 'invalid email');
            return;
        }

        const isValidPassword = passwordRegex.test(password);
        if(!isValidPassword){
            sendBadRequest(res, 'password must be at least 8 characters, including one uppercase letter and one special character');
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

        sendCreated(res, 'successfully created user');
        return;
    } catch (error) {
        console.log('error in register');
        console.log(error);
        sendServerError(res);
        return;
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            sendBadRequest(res, 'email and password are required');
            return;
        }

        const sanitizedEmail = email.toLowerCase();
        const userExists = await prisma.user.findUnique({
            where: { email: sanitizedEmail },
        });
        if(!userExists){
            sendBadRequest(res, 'invalid credentials');
            return
        }

        const user = userExists;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            sendBadRequest(res, 'invalid credentials');
            return
        }

        // token expires in 1 hour and cookie in 1 day
        // for simplicity, refresh tokens are not implemented in this project
        // production solution should include this
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '2h' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 
        });

        sendOk(res, 'succesfully logged in', token);
        return;

    } catch (error) {
        console.log('error in sign in');
        console.log(error);
        sendServerError(res);
        return;
    }
}   

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    res.status(200).json({
      statusCode: 200,
      message: 'successfully logged out',
    });
    return;
  } catch (error) {
    console.error('error logging out', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
    return;
  }
};