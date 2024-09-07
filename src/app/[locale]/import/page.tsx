import { getServerSession } from "next-auth";
import { useDataElementsRepository, useUsersRepository } from "../../../../repositories/useRepository";
import Layout from "../../../components/layout";
import Dashboard from "../dashboard/dashboard";
import { redirect } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image"
import DatabaseConnectionForm from "./databaseConnectionForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOpt";

export default async function Import() {
 

  const userRepository =  useDataElementsRepository();

  // Fetch data directly without useState and useEffect
  const data =  userRepository.getAll().then((data) => {
    return data;
  });

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // Redirect to login or show unauthorized message

    redirect("/");
  }
  
  return (
    <Layout>
      <h1>Import</h1>
      <div>{JSON.stringify(data)}</div> 
       {/* <DatabaseConnectionForm onConnect={handleConnect}/> */}
      {/* <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        fill
        className="rounded-md object-cover"
      />
     
    </AspectRatio> */}
    </Layout>
  );
}
