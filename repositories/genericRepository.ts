
import { authOptions } from '@/app/api/auth/[...nextauth]/authOpt';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  credentials?:string;
  body?: string | Record<string, any> | undefined; // Add constraint to type parameter T
};

export const useGenericRepository = <T extends string | Record<string, any> | undefined>(apiUrl: string) => {


  const makeRequest = async (url: string, options?: RequestOptions): Promise<Response> => {
    const session = await getServerSession(authOptions);


    const defaultHeaders = {
     
      'Content-Type': 'application/json',
    };

    const defaultOptions: RequestOptions = {
      method: 'GET',
      headers: defaultHeaders,
      credentials: 'include',
    };

    const requestOptions: RequestOptions = {
      ...defaultOptions,
      ...options,
    };
   

    // Handle the request body for 'GET' and other methods
    if (requestOptions.method === 'GET' || !requestOptions.method) {
      delete requestOptions.body; // Remove the body for 'GET' requests
    } else {
      requestOptions.body = JSON.stringify(requestOptions.body);
    }

    return fetch(url, requestOptions as RequestInit);
  };

  const getAll = async (options?: RequestOptions): Promise<T[]> => {
    try {
      const response = await makeRequest(apiUrl, options);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch data. Status: ${response.status}. Message: ${errorMessage}`);

      }

      const data = await response.json();

      return data as T[];
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };



  const getById = async (id: number, options?: RequestOptions): Promise<T> => {
    try {
      const response = await makeRequest(`${apiUrl}/${id}`, options);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('Error fetching data by ID:', error);
      throw error;
    }
  };

  const create = async (data: T, options?: RequestOptions): Promise<T> => {

    try {
      const response = await makeRequest(apiUrl, {
        ...options,
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Failed to create data. Status: ${response.status}`);
      }

      const createdData = await response.json();
      console.log('Data created successfully:', createdData);
      revalidateTag('data');

      return createdData as T;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  };

  const update = async (id: number, data: T, options?: RequestOptions): Promise<T> => {
    try {
      const response = await makeRequest(`${apiUrl}/${id}`, {
        ...options,
        method: 'PUT',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Failed to update data. Status: ${response.status}`);
      }

      const updatedData = await response.json();
      console.log('Data updated successfully:', updatedData);
      revalidateTag('data'); // Assuming you want to trigger revalidation after update

      return updatedData as T;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  };


  const remove = async (id: number, options?: RequestOptions): Promise<void> => {
   
   console.log(`${apiUrl}/${id}`)
    try {
      const response = await makeRequest(`${apiUrl}${id}`, {
        ...options,
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete data. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      revalidateTag('data');
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  };


  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};
