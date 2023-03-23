import { status400, status401, status201, status403 } from './../../../utils/sendAPIresponse';
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const { method } = request;

    if (method === 'DELETE') {
        const session = await getServerSession(request, response, authOptions);

        if (!session) {
            return status401(response, "Unauthenticated call!.");
        }

        try {
            const postId = request.body;
            const result = await client.post.delete({
                where: {
                    id: postId
                }
            })
            return status201(response, result);
        } catch (error: any) {
            return status403(response, 'Something went wrong' + error.message)
        }
    } else {
        return status400(response, 'Bad Request');
    }
}