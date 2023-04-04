import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { addNewUser } from '../usersSlice';
import styles from '../../education/styles/education.module.scss';
import selectorEducation from '../../education/selectors';

function FormAddUser({ setModal }: { setModal: (value: string) => void }): JSX.Element {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState('');
  const [newEducation, setNewEducation] = useState('Не выбрано');
  const { educations } = useSelector(selectorEducation);

  const selectEl = useRef<null | HTMLSelectElement>(null);

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addNewUser({ name: userName, education: newEducation }));
    setModal('');
  };

  const dropSelect = (): void => {
    if (selectEl.current) {
      selectEl.current.selectedIndex = 0;
    }
  };

  return (
    <form className={styles.table__form} onSubmit={handleAddUser}>
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
        {/* <input
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          type="text"
          name="education"
        /> */}
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

export default FormAddUser;
