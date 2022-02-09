export enum SkillCategoriesEnum {
  ComputerScience = "computerScience",
  Mathematics = "mathematics",
  Sport = "sport",
  Games = "games",
  Other = "other",
}

export enum SkillCategoriesToColumnNameEnum {
  ComputerScience = "computer-science",
  Mathematics = "mathematics",
  Sport = "sport",
  Games = "games",
  Other = "other",
}

export const skillCategoriesColumns = [
  SkillCategoriesToColumnNameEnum.ComputerScience,
  SkillCategoriesToColumnNameEnum.Mathematics,
  SkillCategoriesToColumnNameEnum.Sport,
  SkillCategoriesToColumnNameEnum.Games,
  SkillCategoriesToColumnNameEnum.Other,
];

export enum ContentElementTypeEnum {
  contents = "contents",
  text = "text",
  textWithImage = "textWithImage",
  video = "video",
  videWithText = "videWithText",
  tabs = "tabs",
}

export type alignmentPositions = "left" | "right" | "top" | "bottom";
export type contentElements =
  | "contents"
  | "text"
  | "textWithImage"
  | "video"
  | "videWithText"
  | "tabs";

export interface SkillPageElement {
  type: contentElements;
  order: number;
}

export interface Contents extends SkillPageElement {}

export interface TextSection extends SkillPageElement {
  header?: string;
  subHeader?: string;
  text: string;
}

export interface TextWithImageSection extends TextSection {
  imagePosition: alignmentPositions;
}

export interface VideoSection extends SkillPageElement {
  caption?: string;
  videoUrl: string;
}

export interface VideWithTextSection extends VideoSection {
  textPosition: alignmentPositions;
}

interface Tab {
  tabCaption: string;
  tabContents:
    | TextSection
    | TextWithImageSection
    | VideoSection
    | VideWithTextSection;
}
export interface TabsSection extends SkillPageElement {
  tabs: Tab[];
}
