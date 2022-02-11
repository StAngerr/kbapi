import { Request, Response, Router } from "express";
import Skill from "../models/Skill.model";
import {
  createNewSkill,
  deleteSkill,
  getAllSKills,
  getSkillById,
  updateSkill,
} from "../controllers/Skill.controller";
import { SkillCategoriesEnum } from "../types/Skill.types";

const router = Router();

router.use((req, res, next) => {
  console.log("Skill router logged", req.url);
  res.cookie("XSRF-TOKEN", req.csrfToken());
  const isModify =
    req.method.toLowerCase() === "post" || req.method.toLowerCase() === "put";
  if (isModify && !req.session.user) {
    res.status(403);
    res.send("You need to login to perform action");
  }
  next();
});

router.get("/", (req: Request, res: Response) => {
  getAllSKills(req, res);
});

router.get("/categories", (req: Request, res: Response) => {
  const aa = Object.keys(SkillCategoriesEnum);
  console.log("from categories");
  res.send(Object.keys(SkillCategoriesEnum));
});

router.post("/", (req: Request, res: Response) => {
  createNewSkill(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  deleteSkill(req, res);
});

router.get("/:skillId", (req: Request, res: Response) => {
  getSkillById(req, res);
});

router.put("/:skillId", (req: Request, res: Response) => {
  updateSkill(req, res);
});
export default router;
