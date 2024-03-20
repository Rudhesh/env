"use server"
import { revalidatePath, revalidateTag } from "next/cache";
import { useCreateUserRepository, useDataElementsRepository, useDeleteUserRepository, useChangeEmailRepository, useUsersRepository, useUsersWithPermissionRepository, useResetPasswordRepository } from "../repositories/useRepository";
import base64 from "base-64";
import axios from "axios";
import { decryptString } from "@/services/cryptoService";
import { getServerSession } from "next-auth";
import { sendMail } from "@/lib/mail";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CloudCog } from "lucide-react";
import { Alert } from "@mui/material";



export const addData = async (e: FormData) => {

  const realname = e.get("realname")?.toString();
  const email = e.get("email")?.toString();
  const role = e.get("role")?.toString(); // Use getAll to get all values for the key "roles"
  const password = e.get("password")?.toString();

  if (!realname||!email || !password || !role) return;
  const encodedPassword = base64.encode(password);

  const newData: any = {
    realname,
    email,
    role,
    password: encodedPassword,
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

export const getUsers = async () => {
  const res = await fetch("http://localhost:3000/api/register");
  const data = await res.json();
  return data.users;
};

export const getRoles = async () => {
  try {
    const session = await getServerSession(authOptions);
    const decrypted = decryptString(session?.user?.apiToken as string);

    const response = await fetch('http://localhost:44367/api/Identity/getroles', {
      headers: {
        Authorization: `Bearer ${decrypted}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 401) {
      // Redirect to login page if unauthorized
      // Replace the code below with your redirection logic
      window.location.href = '/login';
    } else {
      throw new Error('An unexpected error occurred');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
}
}
};


export const setUserRoles = async (userId: string, roles: any) => {

  try {
    const session = await getServerSession(authOptions)

    const decrypted = decryptString(session?.user?.apiToken as string);
    const data = {
      [userId]: roles,
    };
    const response = await axios.put(`http://localhost:44367/api/Identity/setuserroles`,data, {
      headers: {
        Authorization: `Bearer ${decrypted}`,
      },
    });
    // Handle response, possibly redirect to login page
    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    revalidateTag('data')

    // Handle other types of errors if needed
    return {
      error: 'An unexpected error occurred',
    };
  }


}


export const removeRoles = async (userId: string, roles: any) => {
  try {
    const session = await getServerSession(authOptions);
    const decrypted = decryptString(session?.user?.apiToken as string);
console.log("removeRoles" ,roles)
    const data = {
      [userId]: roles,
    };

    const response = await axios.delete(`http://localhost:44367/api/identity/removeroles`, {
      headers: {
        Authorization: `Bearer ${decrypted}`,
      },
      data,  // Move the data to the data property in the configuration object
    });

    // Handle response, possibly redirect to login page
    return response.data;
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




export const validateCurrentPassword = async (userId: any, encodedCurrentPassword: string, encodedNewPassword: string) => {
  try {
    const session = await getServerSession(authOptions)

    const decrypted = decryptString(session?.user?.apiToken as string);


    const response = await axios.get(`http://localhost:44367/api/Identity/changepassword/${userId}/${encodedCurrentPassword}/${encodedNewPassword}`, {
      headers: {
        Authorization: `Bearer ${decrypted}`,
      },
    });
    // Handle response, possibly redirect to login page
    return response.data
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



export const getEmailConfirmationCode = async (userId: string, newEmail: string) => {
  try {
    const session = await getServerSession(authOptions)

    const decrypted = decryptString(session?.user?.apiToken as string);

    const response = await axios.get(`http://localhost:44367/api/Identity/getemailconfirmationcode/${userId}`, {
      headers: {
        Authorization: `Bearer ${decrypted}`,
      },
    });
    // Handle response, possibly redirect to login page
    return response.data
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


export const confirmEmail = async (userId: string, code :string , newEmail: string) => {
  try {
    const session = await getServerSession(authOptions)

    const decrypted = decryptString(session?.user?.apiToken as string);

    const response = await axios.post(`http://localhost:44367/api/Identity/confirmemail`, {
      userId,
       code
   }, {
      headers: {
        Authorization: `Bearer ${decrypted}`,
      },
    });
  // Compose and send the email confirmation
  const emailSubject = 'Email Confirmation';


  const emailBody = `
  Dear User,

  Your request to change the email address associated with your account to ${newEmail} has been successfully confirmed.
  
  Confirmation Details:
  - New Email: ${newEmail}
  
  If you did not make this change, please contact our support immediately.
  
  Thank you for using OurApp!
  
  Best regards,
  Breitfuss Support Team
  `;

    await sendMail({
      to: newEmail,
      name: newEmail,
      subject: emailSubject,
      body: emailBody,
    });

    return response.data
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



export const getchangeemailcode = async (userId: string | undefined, newEmail:string, currentEmail : string | undefined) => {
 console.log(userId,currentEmail)
  try {
    const session = await getServerSession(authOptions)

    const decrypted = decryptString(session?.user?.apiToken as string);
    const response = await axios.get(`http://localhost:44367/api/identity/getchangeemailcode/${userId}/${newEmail}`,{
      headers: {
        Authorization: `Bearer ${decrypted}`,
      },
    });
    // Handle response, possibly redirect to login page
    const code = await response.data;

    const resetLink = `http://localhost:3000/updateEmail?userId=${userId}&email=${newEmail}&code=${code}`;
    // Compose and send the password reset email
    const emailSubject = 'Email Change Request';
    const emailBody =
     `Dear User,

    You have requested to change your email for the account associated with the email address: ${currentEmail}.


      To change your Email, click on the following link:
      ${resetLink}

      If you did not request a email reset, please ignore this email.

      Regards,
      Breitfuss
    `;

    await sendMail({
      to: newEmail,
      name: newEmail,
      subject: emailSubject,
      body: emailBody,
    });


    return code
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


export const changeEmail = async (userId: any, newEmail: any, code: string) => {
 
  const newData: any = {
    userId,
    newEmail,
    code,
  };
const changeEmail = useChangeEmailRepository()
const data = await changeEmail.create(newData);
return data

};

export const handlePasswordResetRequest = async ( email: string) => {
  

  try {
    // Fetch password reset token from the server
    const response = await axios.get(`http://localhost:44367/api/Identity/getpasswordresettoken/${email}`);
    const code = response.data;
  const encodedCode = base64.encode(code);
    const resetLink = `http://localhost:3000/generatePassword?email=${email}&code=${encodedCode}`;
    // Compose and send the password reset email
    const emailSubject = 'Password Reset Request';
    const emailBody =
     `Dear User,

    You have requested to reset your password for the account associated with the email address: ${email}.


      To reset your password, click on the following link:
      ${resetLink}

      If you did not request a password reset, please ignore this email.

      Regards,
      Breitfuss
    `;

    await sendMail({
      to: email,
      name: email,
      subject: emailSubject,
      body: emailBody,
    });

    return code;
  } catch (error) {
    // Handle errors, log them, and potentially show an error message to the user
    console.error('Error in password reset:', error);
    throw new Error('Unable to process the password reset request at the moment. Please try again later.');
  }
};


export const resetPassword = async (email: string, newpassword: string, code: string) => {
  
  try {
    const response = await axios.post(`http://localhost:44367/api/Identity/resetpassword`, {
      email,
      newpassword,
      code
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


  

//   const newData: any = {
//     email,
//     newPassword,
//     token,
//   };

// const resetPassword = useResetPasswordRepository()
// const data = await resetPassword.create(newData);
// return data
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