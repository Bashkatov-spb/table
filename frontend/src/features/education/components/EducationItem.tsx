/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { useSelector } from 'react-redux';
import { Education } from '../types/EducationTypes';
import styles from '../styles/education.module.scss';
import { useAppDispatch } from '../../../store';
import { selectEducation } from '../educationSlice';
import selectorEducation from '../selectors';

function EducationItem({ education }: { education: Education }): JSX.Element {
  const dispatch = useAppDispatch();
  const { selectedEducation } = useSelector(selectorEducation);

  const handleSelect = (): void => {
    selectedEducation === education.id
      ? dispatch(selectEducation(0))
      : dispatch(selectEducation(education.id));
  };

  return (
    <tr
      onClick={handleSelect}
      className={
        selectedEducation === education.id
          ? `${styles.table__row} ${styles.active}`
          : `${styles.table_row}`
      }
    >
      <td>{education.id}</td>
      <td className={styles['table__row-education']}>{education.education}</td>
    </tr>
  );
}

export default EducationItem;
