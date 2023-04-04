import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store';
// import { updateEducationType } from '../educationSlice';
// import selectorEducation from '../selectors';
import styles from '../../education/styles/education.module.scss';
import { updateUser } from '../usersSlice';

function FormUpdateUser({ setModal }: { setModal: (value: string) => void }): JSX.Element {
  const dispatch = useAppDispatch();
  const { selectedUser, users } = useSelector((store: RootState) => store.users);
  const { educations } = useSelector((store: RootState) => store.education);
  const currentUser = users.filter((us) => us.id === selectedUser)[0].name;
  const [userName, setUserName] = useState(currentUser);
  const [newEducation, setNewEducation] = useState('Не выбрано');

  const selectEl = useRef<null | HTMLSelectElement>(null);

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateUser({ id: selectedUser, name: userName, education: newEducation }));
    setModal('');
  };

  const dropSelect = (): void => {
    if (selectEl.current) {
      selectEl.current.selectedIndex = 0;
    }
  };

  return (
    <form className={styles.table__form} onSubmit={handleUpdateUser}>
      <label htmlFor="">
        ФИО
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          name="education"
          required
        />
      </label>
      Образование
      <select
        onChange={(e) => setNewEducation(e.target.value)}
        name="education"
        autoComplete="off"
        required
        ref={selectEl}
      >
        <option disabled selected hidden>
          {' '}
        </option>
        {educations.map((education) => (
          <option value={education.id} key={education.id}>
            {education.education}
          </option>
        ))}
      </select>
      <button type="button" onClick={dropSelect}>
        X
      </button>
      <button disabled={newEducation === 'Не выбрано'} type="submit">
        Добавить
      </button>
    </form>
  );
}

export default FormUpdateUser;
