import { Request, Response } from "express";
import Skill from "../models/Skill.model";
import SkillCategoryModel from "../models/SkillCategory.model";
import CategoryModel from "../models/Category.model";

export const getAllSKills = (req: Request, res: Response) => {
  Skill.findAll().then((data) => {
    res.send(data);
  });
};

export const getSkillById = (req: Request, res: Response) => {
  const { skillId } = req.params;
  Skill.findOne({ where: { id: skillId } })
    .then((skill) => res.send(skill))
    .catch(() => {
      res.status(404);
      res.send("Skill not found");
    });
};

export const createNewSkill = (req: Request, res: Response) => {
  const { title, description, author, category } = req.body;
  Skill.create({ title, description, author: 1 })
    .then((newSkill) => {
      if (category) {
        CategoryModel.findOne({
          where: {
            name: category,
          },
        }).then((category: CategoryModel) => {
          if (category) {
            SkillCategoryModel.create({
              skillId: newSkill.id,
              category: category.id,
            }).then((newCategoryMapping) => newCategoryMapping.save());
          }
        });
      }
      newSkill
        .save()
        .then((skill) => res.send(skill))
        .catch(() => res.send("Failed to save skill"));
    })
    .catch((err) => res.send(err));
};

export const updateSkill = (req: Request, res: Response) => {
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
};
