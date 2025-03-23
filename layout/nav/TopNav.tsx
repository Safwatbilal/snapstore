import SelectTopBar from "@/components/global/Select";
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SIGNUP_PATH } from "@/routes/path";

const TopNav = () => {
  return (
    <div className="flex gap-2 ">
      <SelectTopBar />
      <Link href={SIGNUP_PATH.SIGNUP}>
        <Button variant='outline' className="button">
          Sign Up
        </Button>
      </Link>
    </div>
  );
}

export default TopNav;
