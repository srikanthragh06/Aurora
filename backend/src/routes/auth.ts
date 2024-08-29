import express from "express";
import { signinHandler, signupHandler } from "../controllers/auth";
import { signinValidation, signupValidation } from "../middlewares/auth";

const router = express.Router();

router.route("/sign-up").post(signupValidation, signupHandler);

router.route("/sign-in").post(signinValidation, signinHandler);

export default router;
