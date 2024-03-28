import { useDataElementsRepository, useUsersRepository } from "../../../../repositories/useRepository";
import Layout from "../../../components/layout";
import Dashboard from "../dashboard/dashboard";

export default function Import() {
 

  const userRepository =  useDataElementsRepository();

  // Fetch data directly without useState and useEffect
  const data =  userRepository.getAll().then((data) => {
    return data;
  });



  return (
    <Layout>
      <h1>Import</h1>
      <div>{JSON.stringify(data)}</div>
      <Dashboard/>
    </Layout>
  );
}
