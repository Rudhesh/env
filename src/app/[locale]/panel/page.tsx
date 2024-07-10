import Layout from "@/components/layout";
import { columns } from "./columns";
import EditPanel from "./editPanel";

interface DataPoint {
  id: number;
  value: number;
  time_stamp: string;
  min: number;
  max: string;
  status: string;
  // Add other properties from your JSON data if needed
}
async function getUsers(): Promise<any> {
  const apiUrl = process.env.NEXTAUTH_URL
  const res = await fetch(`${apiUrl}/api/dataPartition`);
  const data = await res.json();
  console.log("DATA",data)
    return data;
}

export default async function Panel() {
  const data = await getUsers();
  return (
    <Layout>
      <EditPanel data={data} />
    </Layout>
  );
}
