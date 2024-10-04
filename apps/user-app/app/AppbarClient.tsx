"use client"

import { Appbar } from "@repo/ui/Appbar";
import { useSession } from "next-auth/react";
import React from "react";
export const AppbarClient =   function() {
  const session = useSession();
  

  return (
   <div>
      <Appbar session={session}/>
   </div>
  );
}
