
 import { User } from '@/types/user';
import {  UserWithPermission } from '@/types/userPermission';
import { useGenericRepository } from './genericRepository';
import { TreeNode } from '@/types/types';

export const useUsersRepository = () => {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL

  const apiUrl = `${NEXTAUTH_URL}/api/register`;
  return useGenericRepository<User>(apiUrl);
};

export const useUsersWithPermissionRepository = () => {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL

  const apiUrl = `${NEXTAUTH_URL}/api/register`;
  return useGenericRepository<UserWithPermission>(apiUrl);
};

export const useDataElementsRepository = () => {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL

  // const apiUrl = 'http://localhost:3030/api/treenodes'; 
  const apiUrl = `${NEXTAUTH_URL}/api/datatree`; 

  return useGenericRepository<TreeNode>(apiUrl);
};

export const useDeleteUserRepository = () => {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL

  const apiUrl = `${NEXTAUTH_URL}/api/register?id=`; 

  return useGenericRepository<any>(apiUrl);
};


export const useCreateUserRepository = () => {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL

  const apiUrl = `${NEXTAUTH_URL}/api/register`; 

  return useGenericRepository<User>(apiUrl);
};



