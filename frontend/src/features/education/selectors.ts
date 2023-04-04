import { RootState } from '../../store';
import { EducationState } from './types/EducationTypes';

const selectorEducation = (store: RootState): EducationState => store.education;
export default selectorEducation;
