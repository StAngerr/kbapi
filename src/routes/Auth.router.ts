import { NextFunction, Request, Response, Router } from "express";
import {
  handleLoginRequest,
  handleLogoutRequest,
  handleRegisterRequest,
  validateSession,
} from "../controllers/Auth.controller";

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Auth router", req.session.id);
  next();
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  handleLoginRequest(req, res);
});

router.get("/logout", (req: Request, res: Response) => {
  handleLogoutRequest(req, res);
});

router.post("/register", (req: Request, res: Response) => {
  handleRegisterRequest(req, res);
});

router.get("/status", (req: Request, res: Response) => {
  validateSession(req, res);
});

export default router;
