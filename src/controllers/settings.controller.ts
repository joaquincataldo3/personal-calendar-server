import { PrismaClient } from "../generated/prisma";
import { AuthenticatedRequest } from "../middlewares/authenticateToken";
import { sendOk, sendServerError } from "../utils/sendResponses";
import { Response } from "express";
const prisma = new PrismaClient();

export const getUserSettings = async (req: AuthenticatedRequest, res: Response) => {
  try { 
    const userId = req.user.id;
    const settings = await prisma.userSettings.findUnique({ where: { user_id: userId } });
    sendOk(res, 'successfully retrieved settings', settings)
  } catch (error) {
    console.log('error getting user settings');
    console.log(error);
    sendServerError(res);
  }
};