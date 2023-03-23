import { status403 } from '../../../utils/sendAPIresponse';
import prisma from "@/prisma";
import { status201, status401 } from "@/utils/sendAPIresponse";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import client from "@/prisma";


/**
 * This API routes used for fetching the Logged in user posted posts.
 * @param request 
 * @param response 
 * @returns 
 */
export default async function handler(request: NextApiRequest,
    response: NextApiResponse) {
    const { method } = request;
    if (method === "GET") {
        const session = await getServerSession(request, response, authOptions);

        if (!session) {
            return response.status(401).json({ message: "Unauthenticated call!." });
        }
        try {
            const data = await prisma.user.findUnique({
                where: { email: session?.user?.email },
                include: {
                    Post: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            _count: {
                                select: {
                                    Comment: true
                                }
                            }
                        }
                    }
                }
            });
            return status201(response, data);
        } catch (error: unknown) {
            return status403(response, (error as Error).message)
        }
    } else {
        return status401(response);
    }
}