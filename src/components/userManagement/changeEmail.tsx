'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ChangeEmail = ({ user }: any) => {
  const [newEmail, setNewEmail] = useState('');
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const currentEmail = session?.user.email;
// const currentEmail = user.email
// const userId = user.userId
console.log({user})
  // async function handleUpdateEmail() {
  //   try {
  //     const code = await getchangeemailcode(userId, newEmail, currentEmail);
  //     // Handle success scenario or display appropriate message
  //     console.log('Email change link sent successfully:', code);
  //   } catch (error) {
  //     // Handle error scenario or display appropriate message
  //     console.error('Error sending email change link:', error);
  //   }
  // }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Change Email</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]  bg-slate-100 dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle>Change Email</DialogTitle>
            <DialogDescription>
              Enter your new email address below, and click Update to send a confirmation link. After clicking Update, check your inbox and follow the instructions in the email to confirm the changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex items-center">
              <Label htmlFor="email" className="text-right px-2 flex-shrink-0 w-24">
                New Email
              </Label>
              <Input
                id="email"
                type="email"
                className=" max-w-sm h-8  dark:bg-slate-950"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
          </div>

          {/* <DialogFooter>
            <Button size='sm' variant='outline' onClick={handleUpdateEmail}>Update</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeEmail;
