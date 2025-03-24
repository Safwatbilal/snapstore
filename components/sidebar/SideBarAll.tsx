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
    const { lang } = useSelector((state: IRootState) => state.control);
    const handleChangeStateSideBar = () => {
        dispatch(updateControlStateSideBar({ key: "state", payload: state === "open" ? "close" : "open" }));
    };
    console.log(state)
    const sidebarWidth = state === "open" ? 170 : 40;
    const marginStyle = lang === 'en' ? { marginLeft: sidebarWidth - 80 } : { marginRight: sidebarWidth - 80 };
    const contentMargin = lang === 'en' ? { marginLeft: sidebarWidth } : { marginRight: sidebarWidth };
    const paddingStyle=lang==='en'?{paddingLeft:sidebarWidth}:{paddingRight:sidebarWidth}
    
    return (
        <SidebarProvider>
            <AppSidebar navListDataAnylist={anylistNav} navListDataApp={appNav} />
            <main className="flex flex-col min-h-screen">
                <div className=" flex items-center w-full justify-between p-4 h-16 text-black bg-white fixed right-0 " style={paddingStyle}>
                    <div  style={marginStyle}>
                        <SidebarTrigger className="cursor-pointer w-12 h-12 text-5xl" onClick={handleChangeStateSideBar} />
                    </div>
                    <TopNav />
                </div>
            </main>
                <div className="p-6 mt-20 w-full" >{children}</div>
        </SidebarProvider>
    );
};

export default SideBarAll;
