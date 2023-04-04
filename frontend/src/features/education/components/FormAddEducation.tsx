import React, { useState } from 'react';
import { useAppDispatch } from '../../../store';
import { addNewEducationType } from '../educationSlice';
import styles from '../styles/education.module.scss';

function FormAddEducation({ setModal }: { setModal: (value: string) => void }): JSX.Element {
  const dispatch = useAppDispatch();
  const [education, setEducation] = useState('');

  const handleAddEducation = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addNewEducationType(education));
    setModal('');
  };

  return (
    <form className={styles.table__form} onSubmit={handleAddEducation}>
      Добавить Образование
      <input
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        type="text"
        name="education"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default FormAddEducation;
