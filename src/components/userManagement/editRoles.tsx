'use client'
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
console.log({user})
  const data1 = useAppSelector((state) => state.userDataItem);
  const dispatch = useAppDispatch();
  console.log(data1)
  useEffect(() => {

    dispatch(fetchUserData());

  }, []);

  // const fetchRoles = async () => {
  //   try {
  //     const rolesData = await getRoles();
  //     setRoles(rolesData);
  //     const data = await userData();
  //     setData(data)
  //   } catch (error) {
  //     console.error('Error fetching roles:', error);
  //   }
  // };

  // const handleRoleCheckboxChange = async (role: Role) => {
  //   try {
  //     // Check if the role is already selected
  //     const isRoleSelected = selectedRoles.includes(role.name);

  //     // Toggle the selection of roles when the checkbox is clicked
  //     const updatedRoles = isRoleSelected
  //       ? selectedRoles.filter((selectedRole) => selectedRole !== role.name)
  //       : [role.name];

  //     // Use await here to make sure setUserRoles completes before moving forward
  //     await setUserRoles(userId, updatedRoles);

  //     // If the role was already selected, remove it using removeRoles
  //     if (isRoleSelected) {
  //       await removeRoles(userId, [role.name]);
  //     }

  //     // Refetch roles after modification
  //     fetchRoles();

  //     // Update state after asynchronous operations
  //     setSelectedRoles(updatedRoles);
  //   } catch (error) {
  //     console.error('Error updating roles:', error);
  //   }
  // };

  // async function handleUpdateRoles() {
  //   try {
  //     const data = await userData();
  //     // Handle success scenario or display appropriate message
      
  //     console.log('Email change link sent successfully:', data);
  //   } catch (error) {
  //     // Handle error scenario or display appropriate message
  //     console.error('Error sending email change link:', error);
  //   }
  // }



  return (
    <div>
      <Dialog>
        {/* <DialogTrigger asChild>
          <Button size="sm" onClick={fetchRoles}>Update Roles</Button>
        </DialogTrigger> */}
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
          {/* <DialogFooter>
            <Button size='sm' variant='outline' onClick={handleUpdateRoles}>Update</Button>
          </DialogFooter> */}

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserRoles;
