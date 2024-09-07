"use server"
import { revalidatePath, revalidateTag } from "next/cache";
import { useCreateUserRepository, useDataElementsRepository, useDeleteUserRepository, useUsersRepository, useUsersWithPermissionRepository } from "../repositories/useRepository";
import base64 from "base-64";
import axios from "axios";




export const addData = async (e: FormData) => {

  const realname = e.get("realname")?.toString();
  const email = e.get("email")?.toString();
  const role = e.get("role")?.toString(); // Use getAll to get all values for the key "roles"
  const password = e.get("password")?.toString();

  if (!realname||!email || !password || !role) return;

  const newData: any = {
    realname,
    email,
    role,
    password,
  };
console.log({newData})
  const userRepository = useCreateUserRepository();
  try {
   const data =  await userRepository.create(newData);
   console.log({data})
    console.log('User created successfully');
return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    // Handle other types of errors if needed
    return {
      error: 'An unexpected error occurred',
    };
  }

}

export const DatabaseConnectionForm = async (e: FormData) => {
  
  try {
    const response = await axios.post(`http://localhost:3000/api/connectDatabase`, {
     
  });
    // Handle response, possibly redirect to login page
    const data = await response.data;
    return data;
  }  catch (error:unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    // Handle other types of errors if needed
    return {
      error: 'An unexpected error occurred',
    };
  }
};




export const getUsers = async () => {


  const apiUrl = process.env.NEXTAUTH_URL
  console.log({apiUrl})
  const res = await fetch(`${apiUrl}/api/register`);
  const data = await res.json();
  console.log("getuser",data.users)
  return data.users;
  
};





// export const updateData = async (userId: number, updatedData: any) => {
//   const userRepository = useUpdateUserRepository();


//   try {
//     await userRepository.update(userId, updatedData);
//     console.log('User deleted successfully');
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return {
//         error: error.message,
//       };
//     }

//     // Handle other types of errors if needed
//     return {
//       error: 'An unexpected error occurred',
//     };
//   }
//   revalidateTag("data");
// }

export const handleDelete = async (userId: any) => {
  const userRepository = useDeleteUserRepository();
  try {
    await userRepository.remove(userId);
    console.log('User deleted successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    // Handle other types of errors if needed
    return {
      error: 'An unexpected error occurred',
    };
  }
};

// export const handleDelete = async (userId: any) => {
//   const confirmed = "";
// console.log({userId})
   
//       const res = await fetch(`http://localhost:3000/api/register?id=${userId}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//        console.log("done")
//       }
    
// };










export const changeEmail = async (userId: any, newEmail: any, code: string) => {
 
  const newData: any = {
    userId,
    newEmail,
    code,
  };


};


export const dataTree = async () => {
  const dataElementRepository = useDataElementsRepository();
  const data = await dataElementRepository.getAll();
  return data

}

export const userData = async () => {
  const userRepository = useUsersRepository();
  const data = await userRepository.getAll();
  return data

}

export const userPermission = async () => {
  const userRepository = useUsersWithPermissionRepository();
  const data = await userRepository.getAll();
  return data

}




const env = process.env.NODE_ENV
if (env == "development") {
  console.log("development")
}
else if (env == "production") {
  console.log('production')
}



