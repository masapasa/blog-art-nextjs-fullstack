import prisma from "@/prisma";

export async function GET(request: Request) {
  try {
    const data = await prisma.post.findMany({
      include: {
        user: true,
        _count: {
          select: {
            Comment: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return new Response(JSON.stringify(data), {
      status: 201, headers: {
        'content-type': 'application/json',
      }
    });
  } catch (error: unknown) {
    return new Response(JSON.stringify(error), {
      status: 201, headers: {
        'content-type': 'application/json',
      }
    });
  }
}
