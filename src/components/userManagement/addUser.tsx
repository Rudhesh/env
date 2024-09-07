"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { addData } from "../../../actions/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "@/components/ui/use-toast";


interface FormData {
  realname: string;
  email: string;
  role: string;
  password: string;
}

const AddUser = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    realname: "",
    email: "",
    role: "",
    password: "",
  });

  async function clientAction(data: any) {
    console.log({ data });
    const result = await addData(data);
    if (result) {
      console.log({ result });
      if ("error" in result) {
        toast({
          title: "There was a problem with your request.",
          description: result.error,
        });
      } else {
        // Reset the form on successful save
        setFormData({
          realname: "",
          email: "",
          role: "",
          password: "",
        });

        toast({
          title: "Data saved successfully.",
          description: "Your user profile has been created.",
        });
      }
    }
  }

  const { data: session, status: sessionStatus } = useSession();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;

    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus === "authenticated" && (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className=" h-8 ">
            Create User
          </Button>
        </DialogTrigger>
        <DialogContent className=" sm:max-w-[425px]  bg-slate-100 dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Add new user profile. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <form action={clientAction}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="realname" className="text-right">
                  Name
                </Label>
                <Input
                  name="realname"
                  type="text"
                  className="col-span-3 h-8 dark:bg-slate-950 "
                  placeholder="Name"
                  value={formData.realname}
                  onChange={handleInputChange}
                  required
                />

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
                {/* <Label htmlFor="role" className="text-right">
                  Roles
                </Label>
                <Input
                  name="role"
                  type="text"
                  className="col-span-3 h-8 dark:bg-slate-950"
                  placeholder="roles"
                  value={formData.role}
                  onChange={handleInputChange}
                /> */}
                <Label htmlFor="role" className="text-right">
                  Roles
                </Label>
               
                  <select
                    name="role"
                    className="col-span-3 h-8 dark:bg-slate-950 rounded-md  border-2 border-wheat"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="superAdmin">Super Admin</option>
                    <option value="DataAdmin">Data Admin</option>
                  </select>
       

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
              </div>
            </div>

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
