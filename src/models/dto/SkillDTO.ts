import Skill from "../Skill.model";
import CategoryModel from "../Category.model";

export class SkillDTO {
  public id: number;
  public title: string;
  public description: string;
  public shortDescription: string;
  public author: number;
  public category: { name: string; id: number }[];

  constructor(skill: Skill) {
    this.id = skill.id;
    this.title = skill.title;
    this.description = skill.description;
    this.shortDescription = skill.shortDescription;
    this.author = skill.author;
    this.category = skill.categories.map((data: CategoryModel) => ({
      name: data.name,
      id: data.id,
    }));
  }
}
