import Layout from "../../../components/layout"
import { UserPermissionTable } from "@/components/userPermissionTable";
import { userPermission } from "../../../../actions/actions";
import { columns } from "./columns";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function DataAdmin() {


  const t = await getTranslations('Data-admin');

    const data =  await userPermission();

    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.roles.includes('DataAdmin')) {
      // Redirect to login or show unauthorized message
      
      redirect("/");
     
    }
    return (
        <Layout>
              <div className="p-10 rounded">
 
 <div className="flex justify-between items-center mb-6">
   <h1 className="text-2x1 font-bold">{t("title")}</h1>
 </div>
 <UserPermissionTable columns={columns} data={data} />
</div>
         
      </Layout>
    )
}