import Layout from "../../../components/layout";
import { getServerSession } from "next-auth";
import { decryptString } from "@/services/cryptoService";
import {getTranslations} from 'next-intl/server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { setFilteredData } from "@/features/data/filterDataSlice";
import Graph from "@/components/panel/Graph";




export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // const decrypted = decryptString(session?.user?.apiToken as string);
const t = await getTranslations('IndexPage');







  return (
    <Layout>
      <section className="py-4 w-full">
      
      <div>
        <p>{t("title")}</p>
        {t.rich('description', {
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </div>
      {/* <Graph data={filterData.filteredData} /> */}
      
      </section>
    </Layout>
  );
}
