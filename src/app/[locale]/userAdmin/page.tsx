
import {  columns } from "./columns";
import { DataTable } from "@/components/data-table";
import Layout from "../../../components/layout";
import { getTranslations } from "next-intl/server";
import { getUsers, userData } from "../../../../actions/actions";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import ServerComp from "@/components/serverComp";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserAdmin() {

  const t = await getTranslations('User-admin');
  const data =  await getUsers();
  const session = await getServerSession(authOptions)
  // if (!session || !session.user || !session.user.roles.includes('UserAdmin')) {
  //   // Redirect to login or show unauthorized message
  //   redirect("/");
  // }
  return (
    <Layout>
      <div className="p-10 rounded">
   
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2x1 font-bold">{t("title")}</h1>
        </div>
        <DataTable columns={columns} data={data} />
        {/* <ServerComp/> */}
      </div>
    </Layout>
  );
}
