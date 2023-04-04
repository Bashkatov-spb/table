export interface EducationState {
  educations: Education[];
  selectedEducation: undefined | number;
  error: undefined | string;
}

export interface Education {
  id?: number;
  education: string;
}
