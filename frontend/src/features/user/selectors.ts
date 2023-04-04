import { RootState } from '../../store';
import { UsersState } from './types/UsersTypes';

const selectorUser = (store: RootState): UsersState => store.users;
export default selectorUser;
