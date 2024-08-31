import { atom } from "recoil";

export const isLoginAtom = atom({
    key: "isLogin",
    default: true,
});

export const isLoggedInAtom = atom({
    key: "isLoggedIn",
    default: false,
});
