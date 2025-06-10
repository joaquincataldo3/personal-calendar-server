import { PrismaClient } from "../generated/prisma";
import { AuthenticatedRequest } from "../middlewares/authenticateToken";
import { sendOk, sendServerError } from "../utils/sendResponses";
import { Response, Request } from "express";
import { languages, locations, timezones } from "../utils/utils";
const prisma = new PrismaClient();

export const getUserSettings = async (req: AuthenticatedRequest, res: Response) => {
  try { 
    const userId = req.user.userId;
    const settings = await prisma.userSettings.findUnique({ where: { user_id: userId } });
    sendOk(res, 'successfully retrieved settings', settings)
  } catch (error) {
    console.log('error getting user settings');
    console.log(error);
    sendServerError(res);
  }
};

export const updateUserSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.userId;
        const { language, timezone, location, dark_mode } = req.body;
        // if record is there, updates it
        // if not, it creates one
        const updated = await prisma.userSettings.upsert({
            where: { user_id: userId },
                update: {
                    language,
                    timezone,
                    location,
                    dark_mode
                },
                create: {
                    user_id: userId,
                    language,
                    timezone,
                    location,
                    dark_mode
                }
        });

        sendOk(res, 'succesfully updated settings', updated);
    } catch (error) {
        console.log('error');
        console.log(error);
        sendServerError(res);
    }
};

export const getSettingsConstants = (req: Request, res: Response) => {
    const settings = [
        languages,
        timezones,
        locations
    ]
    sendOk(res, '', settings);
}