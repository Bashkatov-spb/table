import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { updateEducationType } from '../educationSlice';
import selectorEducation from '../selectors';
import styles from '../styles/education.module.scss';

function FormUpdateEducation({ setModal }: { setModal: (value: string) => void }): JSX.Element {
  const dispatch = useAppDispatch();
  const { selectedEducation, educations } = useSelector(selectorEducation);
  const currentEducation = educations.filter((education) => education.id === selectedEducation)[0]
    .education;
  const [education, setEducation] = useState(currentEducation);

  const handleUpdateEducation = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateEducationType({ id: selectedEducation, education }));
    setModal('');
  };

  return (
    <form className={styles.table__form} onSubmit={handleUpdateEducation}>
      Обновить Образование
      <input
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        type="text"
        name="education"
      />
      <button type="submit">Обновить</button>
    </form>
  );
}

export default FormUpdateEducation;
