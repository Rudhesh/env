"use client"
import { fetchDataElements } from '@/features/data/dataSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react'

export default function DataPartitionFlow() {
    const data = useAppSelector((state) => state.treeData);
  const dispatch = useAppDispatch();
console.log(data)
  useEffect(() => {
  
    dispatch(fetchDataElements());
  }, [dispatch ]);
  return (
    <div>dataPartition</div>
  )
}
