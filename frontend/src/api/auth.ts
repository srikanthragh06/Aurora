import { AxiosResponse } from "axios";
import client from "./client";

// Function to sign up a user
export const signupApi = async (
    email: string,
    password: string,
    username: string
): Promise<AxiosResponse> => {
    const res: AxiosResponse = await client.post("/auth/sign-up", {
        email,
        password,
        username,
    });
    return res;
};

// Function to sign in a user
export const signinApi = async (
    email: string,
    password: string
): Promise<AxiosResponse> => {
    const res: AxiosResponse = await client.post("/auth/sign-in", {
        email,
        password,
    });
    return res;
};
