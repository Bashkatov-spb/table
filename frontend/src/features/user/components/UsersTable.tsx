import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../education/styles/education.module.scss';
import update from '../../education/images/update.png';
import add from '../../education/images/add.png';
import del from '../../education/images/delete.png';
import { RootState, useAppDispatch } from '../../../store';
import UserItem from './UserItem';
import FormAddUser from './FormAddUser';
import { removeUser } from '../usersSlice';
import FormUpdateUser from './FormUpdateUser';

function UsersTable(): JSX.Element {
  const [modal, setModal] = useState('');
  const dispatch = useAppDispatch();
  const { users, selectedUser = 0 } = useSelector((store: RootState) => store.users);

  function handleChangeModalState(e: React.MouseEvent<HTMLButtonElement>): void {
    setModal(e.currentTarget.name);
  }

  return (
    <div className={styles.table__container}>
      {modal === 'add' && <FormAddUser setModal={setModal} />}
      {modal === 'update' && <FormUpdateUser setModal={setModal} />}
      <div className={styles['table__btn-container']}>
        <button
          onClick={handleChangeModalState}
          name="update"
          className={styles['table__btn-put']}
          type="button"
        >
          <img className={styles.table__icon} src={update} alt="update" />
          Редактировать запись
        </button>
        <button
          onClick={handleChangeModalState}
          name="add"
          className={styles['table__btn-add']}
          type="button"
        >
          <img className={styles.table__icon} src={add} alt="add" />
          Добавить запись
        </button>
        <button
          onClick={() => dispatch(removeUser(selectedUser))}
          className={styles['table__btn-del']}
          type="button"
        >
          <img className={styles.table__icon} src={del} alt="delete" />
          Удалить запись
        </button>
      </div>
      <table>
        <caption>Table</caption>
        <tr>
          <th>№</th>
          <th>Сотрудники</th>
          <th>Образование</th>
        </tr>
        {users.map((userItem) => (
          <UserItem key={userItem.id} user={userItem} />
        ))}
      </table>
    </div>
  );
}

export default UsersTable;
