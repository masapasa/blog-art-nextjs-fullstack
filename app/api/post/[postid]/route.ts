import prisma from "@/prisma";

export async function GET(request: Request, { params: { postid } }: {
    params: { postid: string }
}) {
    let result: any;
    let statusCode = 201;

    try {
        result = await prisma.post.findUnique({
            where: {
                id: postid,
            },
            include: {
                user: true,
                Comment: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        user: true
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);

        result = (error as Error)
        statusCode = 400;
    }
    return new Response((JSON.stringify(result)), {
        status: statusCode, headers: {
            'content-type': 'application/json',
        }
    });
}