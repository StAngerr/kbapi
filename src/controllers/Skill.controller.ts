import { Request, Response } from "express";
import Skill from "../models/Skill.model";
import SkillCategoryModel from "../models/SkillCategory.model";
import CategoryModel from "../models/Category.model";
import { SkillCategoriesToColumnNameEnum } from "../types/Skill.types";
import { FindOptions, Op } from "sequelize";
import { SkillDTO } from "../models/dto/SkillDTO";
import categoryModel from "../models/Category.model";

export const getAllSKills = (req: Request, res: Response) => {
  const { currentUserOnly, searchQuery } = req.query;
  const queryOptions: FindOptions = {
    include: {
      model: CategoryModel,
      as: "categories",
    },
  };
  if (currentUserOnly && req.session.user) {
    queryOptions.where = {
      author: req.session.user.id,
    };
  }

  if (searchQuery) {
    if (queryOptions.where) {
      // @ts-ignore
      queryOptions.where.title = {
        [Op.like]: "%" + searchQuery + "%",
      };
    } else {
      queryOptions.where = {
        title: {
          [Op.like]: "%" + searchQuery + "%",
        },
      };
    }
  }
  Skill.findAll(queryOptions).then((data: Skill[]) => {
    res.send(data.map((item: Skill) => new SkillDTO(item)));
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
  const { title, description, shortDescription, category: ctKey } = req.body;
  const userId = req.session.user.id;
  Skill.create({
    title,
    description,
    shortDescription,
    author: userId,
  })
    .then((newSkill) => {
      if (ctKey) {
        CategoryModel.findOne({
          where: {
            name: (<any>SkillCategoriesToColumnNameEnum)[ctKey],
          },
        }).then((categoryObj: CategoryModel) => {
          if (categoryObj) {
            SkillCategoryModel.create({
              skillId: newSkill.id,
              categoryId: categoryObj.id,
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
  const { title, shortDescription, description, category } =
    req.body as Skill & { category: string };
  Skill.findOne({
    where: { id: skillId },
    include: {
      model: CategoryModel,
      as: "categories",
    },
  }).then((skill) => {
    if (skill) {
      Skill.update(
        { title, shortDescription, description },
        { where: { id: skill.id } }
      ).then(() =>
        Skill.findOne({
          where: { id: skillId },
        }).then((updatedSkill) => res.send(updatedSkill))
      );
      if (
        category &&
        skill.categories.length &&
        skill.categories[0].name !== category
      ) {
        updateCategory(skill.id, category);
      }
    } else {
      res.status(404);
      res.send(`Skill with id ${skillId} not found`);
    }
  });
};

const updateCategory = (skillId: number, categoryName: string) => {
  CategoryModel.findOne({
    where: {
      name: (<any>SkillCategoriesToColumnNameEnum)[categoryName],
    },
  }).then((category: categoryModel) => {
    if (category) {
      SkillCategoryModel.update(
        {
          categoryId: category.id,
        },
        {
          where: {
            skillId,
          },
        }
      );
    }
  });
};

export const deleteSkill = (req: Request, res: Response) => {
  const { id } = req.params;
  Skill.findOne({
    where: {
      id,
    },
  }).then((skill) => {
    if (skill) {
      skill.destroy();
      res.send(true);
      return;
    }
    res.status(404);
    res.send(`Skill with id ${id} not found`);
  });
};
