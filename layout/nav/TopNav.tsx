'use client'
import SelectTopBar from "@/components/global/Select";
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SIGNUP_PATH } from "@/routes/path";
import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";
import TooltipButton from "@/components/global/tooltipButton";
import { dispatch } from "@/store/store";
import { updateControlState } from "@/store/slice/control";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { DrawerDemo } from "@/components/global/Drawer";
import { IRootState } from "@/store/rootReducers";
import { Badge } from "@/components/ui/badge";
const TopNav = () => {
  const {t}=useTranslation()
  const path=usePathname()
  const isSignUp=path!=='/sign-up'
  const handleLogout = () => {
    dispatch(updateControlState({ key: "isLogout", payload: true }));
    localStorage.clear()
  };
  
  const {isLogout,lang} = useSelector((state: IRootState) => state.control);

  return (
    <div className={`flex absolute ${lang==='ar'?'left-5':'right-5'} top-2 gap-4 `}>
      <SelectTopBar />
      {isLogout&& isSignUp&&<Link href={SIGNUP_PATH.SIGNUP}>
          <Button variant='outline' className="button">
          {t('sign.sign')}
        </Button>
      </Link>}
      {!isLogout&&
      <>
      <DrawerDemo></DrawerDemo>
      <TooltipButton icon={
      <Badge variant='outline' className="!border-0  cursor-pointer">
        
        <LogOut className="!w-5 !h-5"/>
      </Badge>
        
        
        } onClick={handleLogout} title="Logout" className="cursor-pointer"></TooltipButton>
      </>
     }</div>
  );
}

export default TopNav;
