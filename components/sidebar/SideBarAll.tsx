"use client";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/layout/nav/AppSideBar";
import { appNav, anylistNav } from "@/layout/nav/config";
import TopNav from "@/layout/nav/TopNav";
import { useSelector } from "react-redux";
import { dispatch } from "@/store/store";
import { updateControlStateSideBar } from "@/store/slice/sidebar";

const SideBarAll: React.FunctionComponent<{ children: any }> = ({ children }) => {
    const { state } = useSelector((state: IRootState) => state.sidebar);
 
    const handleChangeStateSideBar = () => {
        dispatch(updateControlStateSideBar({ key: "state", payload: state === "open" ? "close" : "open" }));
    };

    const sidebarWidth = state === "open" ? 170 : 40;

    return (
        <SidebarProvider>
            <AppSidebar navListDataAnylist={anylistNav} navListDataApp={appNav} />
            <main className="flex flex-col min-h-screen">
                <div className="flex items-center w-full justify-between p-4 h-16 text-black bg-white fixed right-0 transition-all duration-300" style={{ paddingLeft: sidebarWidth }}>
                    <div className="transition-all duration-300" style={{ marginLeft: sidebarWidth - 80 }}>
                        <SidebarTrigger onClick={handleChangeStateSideBar} />
                    </div>
                    <TopNav />
                </div>
                <div className="p-6 mt-20" style={{ marginRight: sidebarWidth }}>{children}</div>
            </main>
        </SidebarProvider>
    );
};

export default SideBarAll;
