/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { useSelector } from 'react-redux';
import { User } from '../types/UsersTypes';
import styles from '../../education/styles/education.module.scss';
import { useAppDispatch } from '../../../store';
import selectorUser from '../selectors';
import { selectUser } from '../usersSlice';

function UserItem({ user }: { user: User }): JSX.Element {
  const dispatch = useAppDispatch();
  const { selectedUser } = useSelector(selectorUser);

  const handleSelect = (): void => {
    selectedUser === user.id ? dispatch(selectUser(0)) : dispatch(selectUser(user.id));
  };

  return (
    <tr
      onClick={handleSelect}
      className={
        selectedUser === user.id ? `${styles.table__row} ${styles.active}` : `${styles.table_row}`
      }
    >
      <td>{user.id}</td>
      <td className={styles['table__row-education']}>{user.name}</td>
      {user.EducationTypes.length > 0 && <td>{user.EducationTypes[0].education}</td>}
    </tr>
  );
}

export default UserItem;
