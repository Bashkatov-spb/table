import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clearError, loadEducationTypes } from '../features/education/educationSlice';
import EducationTable from '../features/education/components/EducationTable';
import { RootState, useAppDispatch } from '../store';
import './App.css';
import UsersTable from '../features/user/components/UsersTable';
import { loadUsers } from '../features/user/usersSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const { error } = useSelector((store: RootState) => store.education);

  useEffect(() => {
    dispatch(loadEducationTypes());
    dispatch(loadUsers());
    if (error) {
      alert('Невозможно удалить запись, которая используется');
      dispatch(clearError());
    }
  }, [dispatch, error]);

  const onHandleSubmit = () => {};
  return (
    <div className="App">
      <div
        style={{
          width: '200px',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 auto',
        }}
      >
        <Link to="/education">Education</Link>
        <Link to="/workers">Workers</Link>
      </div>
      <Routes>
        <Route path="/workers" element={<UsersTable />} />
        <Route path="/education" element={<EducationTable />} />
      </Routes>
      <form method="post" action="/api/photo" encType="multipart/form-data">
        <input multiple type="file" name="foo" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
