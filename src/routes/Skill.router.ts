import { Request, Response, Router } from "express";
import Skill from "../models/Skill.model";
import {
  createNewSkill,
  getAllSKills,
  getSkillById,
  updateSkill,
} from "../controllers/Skill.controller";

const router = Router();

router.use((req, res, next) => {
  console.log("Skill router logged");
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

router.get("/", (req: Request, res: Response) => {
  getAllSKills(req, res);
});

router.get("/:skillId", (req: Request, res: Response) => {
  getSkillById(req, res);
});

router.post("/", (req: Request, res: Response) => {
  createNewSkill(req, res);
});

router.put("/:skillId", (req: Request, res: Response) => {
  updateSkill(req, res);
});

export default router;
