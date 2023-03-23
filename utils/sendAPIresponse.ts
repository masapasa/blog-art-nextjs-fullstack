import { NextApiResponse } from "next";

export const status401 = (res: NextApiResponse, message?: string) => {
    const resMessage = message || 'You are not authorized to access this API.';
    return res.status(401).json(resMessage);
}

export const status201 = (res: NextApiResponse, obj?: Object | String | null) => {
    const resMessage = obj;
    return res.status(201).json(resMessage);
}
export const status400 = (res: NextApiResponse, message?: string) => {
    const resMessage = message || 'Bad request';
    return res.status(201).json(resMessage);
}
export const status403 = (res: NextApiResponse, obj?: string | Object) => {
    const resMessage = obj;
    return res.status(201).json(resMessage);
}
export const status500 = (res: NextApiResponse, obj?: Object | String) => {
    const resMessage = { ...obj, message: 'Something went wrong! Please try again later' };
    return res.status(500).json(resMessage);
}