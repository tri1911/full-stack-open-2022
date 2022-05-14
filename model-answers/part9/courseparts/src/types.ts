export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseDescriptedPart extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CourseDescriptedPart {
  type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseDescriptedPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseDescriptedPart {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
