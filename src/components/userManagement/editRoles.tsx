'use client'
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { User } from '@/types/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserData } from '@/features/data/pwSlice';

interface Role {
  id: string;
  name: string;
}

const UserRoles = ({ user }: any) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [data, setData] = useState<User[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const userId = user.userId;

  const data1 = useAppSelector((state) => state.userDataItem);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);  // Add dispatch to the dependency array

  return (
    <div>
      <Dialog>
        <DialogContent className="sm:max-w-[325px]  bg-slate-100 dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle>Edit Roles</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col ">
            <div className="flex flex-row font-bold">
              <div className="w-3/4">Role</div>
              <div className="w-1/4">Action</div>
            </div>

            {roles.map((role) => (
              <div key={role.id} className="flex  flex-row">
                <div className="w-3/4">{role.name}</div>
                <div className="w-1/4">
                  {/* Checkbox to select roles */}
                  {/* <input
                    type="checkbox"
                    checked={data.some((userRole) => userId === userRole.userId && userRole.roles.includes(role.name))}
                    onChange={() => handleRoleCheckboxChange(role)}
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserRoles;
