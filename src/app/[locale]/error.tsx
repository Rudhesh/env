'use client';

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {

 
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 p-8 rounded shadow-md">
        <p className="text-red-500 dark:text-red-400">There was a problem</p>
       
        <h1 className="text-3xl font-bold mt-2 text-gray-800 dark:text-gray-200">
          {error.message || 'Something went wrong'}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          Please try again later or contact support if the problem persists
        </p>
        <div className="mt-6 flex gap-x-6 items-start justify-start">
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>
        <Link href='/' className={buttonVariants({variant: 'outline'})}>Go back to home</Link>
        </div>
      </div>
    </main>
  );
};

export default error;
