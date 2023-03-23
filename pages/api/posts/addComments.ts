import { status400, status403, status201, status401 } from './../../../utils/sendAPIresponse';
import client from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

/**
 * * Handing the create post request with prisma.
 * @param request
 * @param response
 * @returns
 */
export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === "POST") {
        const session = await getServerSession(request, response, authOptions);

        if (!session) {
            return status401(response, "Unauthenticated call!.");
        }

        const { comment: title, postId } = request.body.data;

        if (title.length > 500) {
            return status400(response, "Invalid length provided");
        } else if (!title.length) {
            return status400(response, "The block should not be empty!");
        }

        // Create a new Posts and get the user
        try {
            const user = await client.user.findUnique({
                where: { email: session?.user?.email },
            });
            // const result = await client.comment.create({
            //     data: {
            //         content: title,
            //         authorId: user?.id || '',
            //         postId
            //     },
            // });
            const result = await client.comment.create({
                data: {
                    content: title,
                    authorId: user?.id || '',
                    postId
                }
            })
            return status201(response, result);
        } catch (error: any) {
            return status403(response, {
                message: "Something went wrong.",
                track: error.message,
            });
        }
    } else {
        return status400(response, 'Bad Request');
    }
}
