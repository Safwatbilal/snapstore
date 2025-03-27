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
import { getToken, logout } from "@/components/global/auth";
import { useSelector } from "react-redux";
const TopNav = () => {
  const {t}=useTranslation()
  const handleLogout = () => {
    dispatch(updateControlState({ key: "isLogout", payload: true }));
    localStorage.clear()
  };
  
  const {isLogout} = useSelector((state: RootState) => state.control);
  console.log(isLogout)
  return (
    <div className="flex gap-2 ">
      <SelectTopBar />
      {isLogout&& <Link href={SIGNUP_PATH.SIGNUP}>
        <Button variant='outline' className="button">
          {t('sign.sign')}
        </Button>
      </Link>}
     {!isLogout&&
      <TooltipButton icon={<LogOut/>} onClick={handleLogout} title="Logout" className="cursor-pointer"></TooltipButton>
     }</div>
  );
}

export default TopNav;
