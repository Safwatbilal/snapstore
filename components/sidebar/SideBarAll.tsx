"use client";
import React, { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/layout/nav/AppSideBar";
import { appNav, anylistNav } from "@/layout/nav/config";
import TopNav from "@/layout/nav/TopNav";
import { useSelector } from "react-redux";
import { dispatch } from "@/store/store";
import { updateControlStateSideBar } from "@/store/slice/sidebar";
import Breadcrumb from "../global/Breadcrumb";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const SideBarAll: React.FunctionComponent<{ children: any }> = ({ children }) => {
    const { state } = useSelector((state: IRootState) => state.sidebar);
    const { lang } = useSelector((state: IRootState) => state.control);
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
    const sidebarWidth = state ? 70 : 170;
    const marginStyle = lang === 'en' ? { marginLeft: sidebarWidth - 80 } : { marginRight: sidebarWidth - 80 };
    const contentMargin = lang === 'en' ? { marginLeft: sidebarWidth } : { marginRight: sidebarWidth };
    const paddingStyle = lang === 'en' ? { paddingLeft: sidebarWidth } : { paddingRight: sidebarWidth };

    return (
        <SidebarProvider>
            <AppSidebar navListDataAnylist={anylistNav} navListDataApp={appNav} />
            <main className="flex flex-col min-h-screen ">
                <div className="flex  items-center w-full justify-between p-2 h-12 text-black bg-[#F1F2F7] fixed right-0" style={paddingStyle}>
                    <div style={marginStyle} className="flex items-center  gap-1">
                        <SidebarTrigger className="cursor-pointer w-12 h-12" onClick={handleChangeStateSideBar} />
                    <Breadcrumb data={breadcrumbData} /> 
                    </div>
                    <TopNav />
                </div>
            </main>
            <div className="pt-14 p-4 w-full bg-[#F1F2F7]">{children}</div>
        </SidebarProvider>
    );
};

export default SideBarAll;
