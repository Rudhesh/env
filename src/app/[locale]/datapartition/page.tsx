import { getServerSession } from "next-auth";
import Layout from "../../../components/layout"
import axios from "axios";
import DataPartitionFlow from "./dataPartition";

export default async function DataPartion() {
    const session = await getServerSession();

const getUserss = (
 
    async () => {
      try {
        const response = await axios.get('/api/dataElement');
        
      } catch (error) {
        throw error;
      }
    }
  );
  
  getUserss()
  
    return (
        <Layout>
            { session &&
            <h1>Data-Partion</h1>}
          <DataPartitionFlow/>
      </Layout>
    )
}