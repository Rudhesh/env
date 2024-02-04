'use client'
import { fetchUserData } from '@/features/data/pwSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react'
import { DataTable } from './data-table';
import { columns } from '@/app/[locale]/userAdmin/columns';

const ServerComp = () => {


    const data1 = useAppSelector((state) => state.userDataItem);

    const dispatch = useAppDispatch();
  
    useEffect(() => {
    
      dispatch(fetchUserData());
    }, []);
  
  console.log(data1)
  const data = data1.user
  return (
    <div> <DataTable columns={columns} data={data} /></div>
  )
}

export default ServerComp