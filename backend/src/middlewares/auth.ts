import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { sendClientSideError } from "../utils/responseTemplates";

export const signupValidation = [
    body("email")
        .exists()
        .withMessage("Email is required")
        .isString()
        .withMessage("Email must be a String")
        .isEmail()
        .withMessage("Incorrect email format"),
    body("password")
        .exists()
        .isString()
        .withMessage("Password must be a String")
        .isLength({ min: 10, max: 32 })
        .withMessage("Password must be 10-32 characters in length"),
    body("username")
        .exists()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a String")
        .isLength({ min: 4, max: 24 })
        .withMessage("Username must be 4-24 characters in length"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendClientSideError(res, errors.array()[0].msg);
        }
        next();
    },
];

export const signinValidation = [
    body("email")
        .exists()
        .withMessage("Email is required")
        .isString()
        .withMessage("Email must be a String")
        .isEmail()
        .withMessage("Incorrect email format"),
    body("password")
        .exists()
        .isString()
        .withMessage("Password must be a String")
        .isLength({ min: 10, max: 32 })
        .withMessage("Password must be 10-32 characters in length"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendClientSideError(res, errors.array()[0].msg);
        }
        next();
    },
];
