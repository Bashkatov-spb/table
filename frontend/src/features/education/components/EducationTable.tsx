import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EducationItem from './EducationItem';
import FormAddEducation from './FormAddEducation';
import FormUpdateEducation from './FormUpdateEducation';
import selectorEducation from '../selectors';
import styles from '../styles/education.module.scss';
import update from '../images/update.png';
import add from '../images/add.png';
import del from '../images/delete.png';
import { useAppDispatch } from '../../../store';
import { removeEducationType } from '../educationSlice';

function EducationTable(): JSX.Element {
  const [modal, setModal] = useState('');
  const dispatch = useAppDispatch();

  const { educations, selectedEducation = 0 } = useSelector(selectorEducation);

  function handleChangeModalState(e: React.MouseEvent<HTMLButtonElement>): void {
    setModal(e.currentTarget.name);
  }

  return (
    <div className={styles.table__container}>
      {modal === 'add' && <FormAddEducation setModal={setModal} />}
      {modal === 'update' && <FormUpdateEducation setModal={setModal} />}
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
          onClick={() => dispatch(removeEducationType(selectedEducation))}
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
          <th>Образование</th>
        </tr>
        {educations.map((educationItem) => (
          <EducationItem key={educationItem.id} education={educationItem} />
        ))}
      </table>
    </div>
  );
}

export default EducationTable;
