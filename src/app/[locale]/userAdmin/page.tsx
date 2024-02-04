
import {  columns } from "./columns";
import { DataTable } from "@/components/data-table";
import Layout from "../../../components/layout";
import { getTranslations } from "next-intl/server";
import { userData } from "../../../../actions/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from 'next/navigation';
import ServerComp from "@/components/serverComp";

export default async function UserAdmin() {

  const t = await getTranslations('User-admin');
  const data =  await userData();
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
