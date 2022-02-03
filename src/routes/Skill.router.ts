import { Router } from "express";
import Skill from "../models/Skill.model";

const router = Router();

router.use((req, res, next) => {
  console.log("Skill router logged");
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

router.get("/", (req, res) => {
  Skill.findAll().then((data) => {
    res.send(data);
  });
});

router.get("/:skillId", (req, res) => {
  const { skillId } = req.params;
  Skill.findOne({ where: { id: skillId } })
    .then((skill) => res.send(skill))
    .catch(() => {
      res.status(404);
      res.send("Skill not found");
    });
});

router.post("/", (req, res) => {
  const { title, description, author } = req.body;
  Skill.create({ title, description, author: 1 })
    .then((newSkill) => {
      newSkill
        .save()
        .then((savedUser) => res.send(savedUser))
        .catch(() => res.send("Failed to save skill"));
    })
    .catch((err) => res.send(err));
});

router.put("/:skillId", (req, res) => {
  const { skillId } = req.params;
  Skill.findOne({ where: { id: skillId } })
    .then((skill) => {
      const toUpdate = { ...skill, ...req.body };
      Skill.update(toUpdate, { where: { id: skillId } }).then((updatedSkill) =>
        res.send(updatedSkill)
      );
    })
    .catch(() => {
      res.status(404);
      res.send(`Skill with id ${skillId} not found`);
    });
});

router.post("/test", (a, v, next) => v.send("ok"));

export default router;
