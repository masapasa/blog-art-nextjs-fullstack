export interface PostList {
    id: string;
    createdAt: string;
    authorId: string;
    published: boolean;
    title: string;
    user: User;
    _count: {
        Comment: number
    };
    Comment?: Comments[]
}

export interface User {
    email: string
    /** The user's postal address. */
    address?: string
    name: string
    image: string
    id: string
}

export interface Comments {
    id: string,
    createdAt: string
    content: string
    postId: string
    authorId: string;
    user: User
}


export type AuthUserPost = User & {
    Post: PostList[]
}
