"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {  UserWithPermission } from "@/types/userPermission";


export const columns: ColumnDef<UserWithPermission>[] = [
  {
    accessorKey: "_id",
    header: "User Id",


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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

function populate() {
  console.log(user.userPermissions)
}
      return (
        <>
          <div className="flex cursor-pointer">
            {" "}
          
            <Button onClick={populate}  size='sm'  className=" text-xs mr-2"  variant="outline" >
     < Share2 className="pr-2" />Permission
    </Button>
          </div>

        </>
      );
    },
  },
];
