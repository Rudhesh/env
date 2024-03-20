import Layout from "../../../components/layout";
import { getServerSession } from "next-auth";
import { decryptString } from "@/services/cryptoService";
import {getTranslations} from 'next-intl/server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
      <div className="">
          {/* <h1 className="text-2x1 container   bg-gray-500 font-bold ">{decrypted}</h1> */}
          </div>
          <p>{session?.expires}</p>
          <h1>{JSON.stringify(session)}</h1>
      </section>
    </Layout>
  );
}
