"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FileEdit } from "lucide-react";
import { MoreHorizontal } from "lucide-react"
import { User } from "@/types/types";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ChangeEmail from "@/components/userManagement/changeEmail";
import DeleteUser from "@/components/userManagement/deleteUser";
import EditRoles from "@/components/userManagement/editRoles";
import UserRoles from "@/components/userManagement/editRoles";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "userId",


  },
  {
    accessorKey: "realname",
    header: "Name",


  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        
      );
    },
   
  },
  {
    accessorKey: "role",
    header: "Role",


  },


  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <>
          <div className="flex cursor-pointer">
            {" "}
            
            <DropdownMenu>
  <DropdownMenuTrigger > <FileEdit className="h-5 w-5 mr-2" /></DropdownMenuTrigger>
  <DropdownMenuContent className=" bg-slate-100 dark:bg-slate-900" align="end">
    <DropdownMenuLabel><ChangeEmail user={user}/></DropdownMenuLabel>
    {/* <DropdownMenuLabel><ResetPasswordRequest/></DropdownMenuLabel> */}
    <DropdownMenuLabel><UserRoles  user={user}/></DropdownMenuLabel>
   
   
  </DropdownMenuContent>
</DropdownMenu>
       
            <DeleteUser user={user} />
           
          </div>

        </>
      );
    },
  },
];
