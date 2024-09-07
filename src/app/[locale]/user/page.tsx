
import { getServerSession } from "next-auth";
import React from "react";
import Layout from "../../../components/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableRow, 
} from "@/components/ui/table"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOpt";
export default async function User() {
  const session = await getServerSession(authOptions)
    return (
        <Layout>
          <div></div>
        
          <div className="container mx-auto p-8 flex flex-col sm:max-w-[825px]">
        <div className="mb-8 flex justify-between items-center ">
          <h1 className="text-4xl font-bold"> User Info</h1>
          <div className="flex space-x-2">
          
          </div>
        </div>
        <div className=" border  sm:max-w-[825px]">
        <Table>               
          <TableBody>
            <TableRow>
              <TableCell >
                <span className="font-bold">User ID:</span>
              </TableCell>
              <TableCell >
                {session?.user._id}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell >
                <span className="font-bold">Email:</span>
              </TableCell>
              <TableCell >
                {session?.user.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell >
                <span className="font-bold">Roles:</span>
              </TableCell>
              <TableCell>
                {session?.user.role}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
      </div>
    </Layout>
    )
}