
 import { User } from '@/types/user';
import {  UserWithPermission } from '@/types/userPermission';
import { useGenericRepository } from './genericRepository';
import { TreeNode } from '@/types/types';

export const useUsersRepository = () => {

  const apiUrl = 'http://localhost:44367/api/identity/getuserswithroles';
  return useGenericRepository<User>(apiUrl);
};

export const useUsersWithPermissionRepository = () => {

  const apiUrl = 'http://localhost:3000/api/register';
  return useGenericRepository<UserWithPermission>(apiUrl);
};

export const useDataElementsRepository = () => {

  // const apiUrl = 'http://localhost:3030/api/treenodes'; 
  const apiUrl = 'http://localhost:3000/api/datatree'; 

  return useGenericRepository<TreeNode>(apiUrl);
};

export const useDeleteUserRepository = () => {

  const apiUrl = `http://localhost:3000/api/register?id=`; 

  return useGenericRepository<any>(apiUrl);
};


export const useCreateUserRepository = () => {

  const apiUrl = `http://localhost:3000/api/register`; 

  return useGenericRepository<User>(apiUrl);
};

export const useChangeEmailRepository = () => {

  const apiUrl = `http://localhost:44367/api/identity/changeemail`; 

  return useGenericRepository<any>(apiUrl);
};

export const useResetPasswordRepository = () => {

  const apiUrl = `http://localhost:44367/api/Identity/resetpassword`; 

  return useGenericRepository<any>(apiUrl);
};