"use client"
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import base64 from "base-64";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast"
import { validateCurrentPassword } from '../../../actions/actions';


const ResetPasswordRequest = () => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { data: session, status }: any = useSession();

  const userId = session?.user.userId

  const encodedNewPassword = base64.encode(newPassword);
  const encodedCurrentPassword = base64.encode(currentPassword);

  async function clientAction() {

   
    if (newPassword !== confirmNewPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure the new passwords match.',
      });
      return;
    }
    
    const isValidCurrentPassword = await validateCurrentPassword(userId, encodedCurrentPassword,encodedNewPassword);
    console.log( isValidCurrentPassword )
    if (isValidCurrentPassword.succeeded) {
      toast({
             title: 'Password changed successfully.',
           });
    
    }
    else if (isValidCurrentPassword?.error) {
        toast({
          title: 'Invalid current password',
          description: 'Please enter your correct current password.',
       });
     } else {
     
      toast({
        title: 'Invalid current password',
        description: 'Please enter your correct current password.',
      });
    }
  }
  



  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Change Password</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]  bg-slate-100 dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Once the password is reset, it cannot be restored.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Current Password */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currentPassword" className="text-right">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                className="col-span-3 max-w-sm h-8  dark:bg-slate-950"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                
              />
            </div>
            {/* New Password */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPassword" className="text-right">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                className="col-span-3 max-w-sm h-8  dark:bg-slate-950"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            {/* Confirm New Password */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmNewPassword" className="text-right">
                Confirm New Password
              </Label>
              <Input
                id="confirmNewPassword"
                type="password"
                className="col-span-3 max-w-sm h-8  dark:bg-slate-950"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button size='sm' variant='outline' onClick={clientAction}>Password Reset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResetPasswordRequest;

