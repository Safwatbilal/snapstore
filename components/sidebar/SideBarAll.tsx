'use client'
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/layout/nav/AppSideBar";
import { appNav, anylistNav } from "@/layout/nav/config";
import { useSelector } from "react-redux";
import { dispatch } from "@/store/store";
import { updateControlStateSideBar } from "@/store/slice/sidebar";
import Breadcrumb from "../global/Breadcrumb";
import { usePathname } from "next/navigation";
import { IRootState } from "@/store/rootReducers";
import { DrawerDemo } from "../global/Drawer";
const SideBarAll: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useSelector((state: IRootState) => state.sidebar);
  const { lang, theme } = useSelector((state: IRootState) => state.control);
  const handleChangeStateSideBar = () => {
    dispatch(updateControlStateSideBar({ key: "state", payload: !state }));
  };
  const path = usePathname();
  const breadcrumbItems = path.split('/').filter(Boolean);
  const breadcrumbData = breadcrumbItems.map((item, index) => {
    const breadcrumbPath = `/${breadcrumbItems.slice(0, index + 1).join('/')}`;
    return {
      name: item.charAt(0).toUpperCase() + item.slice(1),
      path: breadcrumbPath,
    };
  });


  return (
    <SidebarProvider>
      <AppSidebar navListDataAnylist={anylistNav} navListDataApp={appNav} />
      <main className="flex flex-col min-h-screen">
        <div className={`flex items-center  justify-between  text-black ${theme} absolute  z-5`} >
          <div  className=" items-center">
            <SidebarTrigger className="cursor-pointer w-12 h-12" onClick={handleChangeStateSideBar} />
           
            <Breadcrumb data={breadcrumbData} />
          </div>
        </div>
      </main>
      <div className={`pt-24 p-4 w-full ${theme} bg-[#F1F2F7]`}>{children}</div>
    </SidebarProvider>
  );
};

export default SideBarAll;
