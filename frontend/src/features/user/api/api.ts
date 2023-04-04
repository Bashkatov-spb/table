/* eslint-disable import/prefer-default-export */
import { User, UserId } from '../types/UsersTypes';

export const loadUsers = async (): Promise<User[]> => {
  const res = await fetch('/api/users');
  return res.json();
};

export const addNewUser = async (newUser: { name: string; education: string }): Promise<User> => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  return res.json();
};

export const removeUser = async (userId: UserId): Promise<number> => {
  const res = await fetch(`/api/users/${userId}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const updateUser = async (updatedUser: {
  id: UserId;
  name: string;
  education: string;
}): Promise<User> => {
  const res = await fetch(`/api/users/${updatedUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });
  return res.json();
};
