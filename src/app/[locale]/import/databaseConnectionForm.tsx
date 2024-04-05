"use client";
import React, { useState } from 'react';


interface FormData {
    host: string;
    port: string;
    database: string;
    user:string;
    password: string;
  }
const DatabaseConnectionForm = () => {
  const [formData, setFormData] = useState<FormData>({
    host: '',
    port: '3306',
    database: '',
    user: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setFormData(formData);
  };
  console.log(formData)

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="host" value={formData.host} onChange={handleChange} placeholder="Host" />
      <input type="text" name="port" value={formData.port} onChange={handleChange} placeholder="Port" />
      <input type="text" name="database" value={formData.database} onChange={handleChange} placeholder="Database Name" />
      <input type="text" name="user" value={formData.user} onChange={handleChange} placeholder="User" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Connect</button>
    </form>
  );
};

export default DatabaseConnectionForm;
