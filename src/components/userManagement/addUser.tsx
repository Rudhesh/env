"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { addData, confirmEmail, getEmailConfirmationCode } from "../../../actions/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "@/components/ui/use-toast"

interface FormData {
  email: string;
  roles: string[]; // Define roles as an array of strings
  password: string;
}


const AddUser = () => {
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    email: '',
    roles: [],
    password: '',
  });


  async function clientAction(data: any) {
    const result = await addData(data);
    if (result) {
      
 
console.log(result)
    if ('error' in result) {
      toast({
        title: "There was a problem with your request.",
        description: result.error,
      });
    } else {
      const confirmationCodeResult = await getEmailConfirmationCode(result?.userId,result?.email);
                   
      if (confirmationCodeResult) {
       console.log({confirmationCodeResult})
          await confirmEmail(result?.userId, confirmationCodeResult,result?.email);
          // Assuming you have a sendMailer function to send the confirmation email
      }
      // Reset the form on successful save
      setFormData({
        email: '',
        roles: [],
        password: '',
      });

      
    toast({
      title: "Data saved successfully.",
      description: "Your user profile has been created.",
    });
  

  }

}
}
  

  const { data: session, status: sessionStatus } = useSession();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;

    if (name === 'roles') {
      const checkbox = e.target as HTMLInputElement;
      const role = checkbox.value;

      setFormData({
        ...formData,
        roles: checkbox.checked
          ? [...formData.roles, role]
          : formData.roles.filter((r) => r !== role),
      });
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }
  };


  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus === "authenticated" && (



      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className=" h-8 "  >Create User</Button>
        </DialogTrigger>
        <DialogContent className=" sm:max-w-[425px]  bg-slate-100 dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Add new user profile. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form action={clientAction}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">

                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  name="email"
                  type="text"
                  className="col-span-3 h-8 dark:bg-slate-950 "
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Label htmlFor="test" className="text-right">
                  Roles
                </Label>
                <Input
                  name="test"
                  type="text"
                  className="col-span-3 h-8 dark:bg-slate-950"
                  placeholder="roles"
                  value={formData.roles}

                />
                <Label htmlFor="roles" className="text-right">

                </Label>
                <div className="col-span-3 flex flex-col gap-2">
                  {['DataAdmin', 'User', 'SuperAdmin', 'UserAdmin'].map((role) => (
                    <div key={role}>
                      <input
                        type="checkbox"
                        id={role}
                        name="roles"
                        value={role}
                        checked={formData.roles.includes(role)}
                        onChange={handleInputChange}
                        className="mr-2 dark:bg-slate-950"
                      />
                      <label htmlFor={role} className="text-sm font-medium leading-none">
                        {role}
                      </label>
                    </div>
                  ))}
                </div>
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  name="password"
                  type="password"
                  className="col-span-3 h-8 dark:bg-slate-950"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />

              </div></div>

            <DialogFooter>
              <Button>Save</Button>

              <DialogClose asChild>

                <Button type="button" variant="secondary">
                  Close
                </Button>

              </DialogClose>
            </DialogFooter>
          </form>

        </DialogContent>

      </Dialog>

    )
  );
};

export default AddUser;
