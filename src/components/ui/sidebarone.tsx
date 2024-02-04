
import React from 'react';
import { Button } from "./button"
import { Sheet, SheetContent, SheetTrigger } from "./sheet"

import Counter from '../common/translationContainer';
import NavBar from './navBar';


const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

type SheetSide = (typeof SHEET_SIDES)[number]

export async function SheetSide() {

  if (typeof window !== 'undefined') {
    console.log('Running on the client side');
  } else {
    console.log('Running on the server side');
  }

  return (
    <div className=" grid grid-cols-2 gap-2">
        <Sheet >
          <div className='flex'>
          <SheetTrigger asChild>
            <Button className="m-10" variant="outline">Left</Button>
          </SheetTrigger>
          <NavBar/>
          </div>
        
          <SheetContent className=' bg-slate-100 dark:bg-slate-800' side={"left"}>
          
    

    {/* <Counter/> */}
          </SheetContent>
        </Sheet>
      
    </div>
  )
}
